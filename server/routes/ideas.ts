import { and, desc, eq, isNull } from 'drizzle-orm'
import { createSelectSchema } from 'drizzle-orm/zod'
import z from 'zod'

import forge from '../forge'
import {
  ideaBoxContainers,
  ideaBoxEntries,
  ideaBoxEntriesImage,
  ideaBoxEntriesLink,
  ideaBoxEntriesText,
  ideaBoxFolders
} from '../schema.drizzle'
import { validateFolderPath } from '../utils/folders'

const entryDto = createSelectSchema(ideaBoxEntries).extend({
  container: z.string(),
  folder: z.string(),
  tags: z.array(z.string())
})

const listIdeaOutput = z.discriminatedUnion('type', [
  entryDto.extend({
    type: z.literal('text'),
    content: z.string()
  }),
  entryDto.extend({
    type: z.literal('image'),
    image: z.string()
  }),
  entryDto.extend({
    type: z.literal('link'),
    link: z.string()
  })
])

function serializeEntry(row: typeof ideaBoxEntries.$inferSelect) {
  return {
    ...row,
    container: row.container,
    folder: row.folder ?? ''
  }
}

function baseEntryInput() {
  return {
    container: forge.existsIn(z.string(), ideaBoxContainers),
    folder: z.string().optional(),
    tags: z.array(z.string())
  }
}

const createInputDto = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), ...baseEntryInput(), content: z.string() }),
  z.object({ type: z.literal('image'), ...baseEntryInput() }),
  z.object({ type: z.literal('link'), ...baseEntryInput(), link: z.string() })
])

const updateInputDto = z.discriminatedUnion('type', [
  z.object({ type: z.literal('text'), tags: z.array(z.string()), content: z.string() }),
  z.object({ type: z.literal('image'), tags: z.array(z.string()) }),
  z.object({ type: z.literal('link'), tags: z.array(z.string()), link: z.string() })
])

export const list = forge
  .query({
    description: 'Get all ideas from a folder or idea container',
    input: {
      query: z.object({
        container: forge.existsIn(z.string(), ideaBoxContainers),
        path: z.string(),
        archived: z.string().optional()
      })
    },
    output: {
      OK: z.array(listIdeaOutput)
    }
  })
  .callback(
    async ({ db, query: { container, path: pathParam, archived }, response }) => {
      const path = pathParam.split('/').filter(e => e)

      const parsedArchived = archived === 'true'

      const { folderExists, lastFolder } = await validateFolderPath(
        db,
        container,
        path
      )

      if (!folderExists) {
        return response.badRequest(
          `Folder with path "${pathParam}" does not exist in container "${container}"`
        )
      }

      const rows = await db
        .select({
          entry: ideaBoxEntries,
          text: ideaBoxEntriesText,
          link: ideaBoxEntriesLink,
          image: ideaBoxEntriesImage
        })
        .from(ideaBoxEntries)
        .leftJoin(
          ideaBoxEntriesText,
          eq(ideaBoxEntriesText.base_entry, ideaBoxEntries.id)
        )
        .leftJoin(
          ideaBoxEntriesLink,
          eq(ideaBoxEntriesLink.base_entry, ideaBoxEntries.id)
        )
        .leftJoin(
          ideaBoxEntriesImage,
          eq(ideaBoxEntriesImage.base_entry, ideaBoxEntries.id)
        )
        .where(
          and(
            eq(ideaBoxEntries.container, container),
            eq(ideaBoxEntries.archived, parsedArchived),
            lastFolder
              ? eq(ideaBoxEntries.folder, lastFolder)
              : isNull(ideaBoxEntries.folder)
          )
        )
        .orderBy(desc(ideaBoxEntries.pinned), desc(ideaBoxEntries.created))

      const results = rows.map(row => {
        const base = serializeEntry(row.entry)

        if (row.entry.type === 'text') {
          return {
            ...base,
            type: 'text' as const,
            content: row.text?.content ?? ''
          }
        }

        if (row.entry.type === 'link') {
          return {
            ...base,
            type: 'link' as const,
            link: row.link?.link ?? ''
          }
        }

        return {
          ...base,
          type: 'image' as const,
          image: row.image?.image ?? ''
        }
      })

      return response.ok(results)
    }
  )

export const create = forge
  .mutation({
    description: 'Create a new idea entry',
    input: {
      body: createInputDto
    },
    media: {
      image: {
        optional: true
      }
    },
    output: {
      CREATED: entryDto
    }
  })
  .callback(
    async ({ db, body, media: { image }, core: { storage }, response }) => {
      const [baseEntry] = await db
        .insert(ideaBoxEntries)
        .values({
          type: body.type,
          container: body.container,
          folder: body.folder || null,
          tags: body.tags
        })
        .returning()

      if (!baseEntry) {
        return response.badRequest('Failed to create idea')
      }

      if (body.type === 'text') {
        await db.insert(ideaBoxEntriesText).values({
          base_entry: baseEntry.id,
          content: body.content
        })
      } else if (body.type === 'image') {
        if (!image || typeof image === 'string') {
          return response.badRequest('Image is required for image entries')
        }

        const ref = await storage.save({ file: image })

        await db.insert(ideaBoxEntriesImage).values({
          base_entry: baseEntry.id,
          image: ref?.key ?? ''
        })
      } else if (body.type === 'link') {
        await db.insert(ideaBoxEntriesLink).values({
          base_entry: baseEntry.id,
          link: body.link
        })
      }

      return response.created(serializeEntry(baseEntry))
    }
  )

export const update = forge
  .mutation({
    description: 'Update an existing idea',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), ideaBoxEntries)
      }),
      body: updateInputDto
    },
    media: {
      image: {
        optional: true
      }
    },
    output: {
      OK: entryDto
    }
  })
  .callback(
    async ({
      db,
      query: { id },
      body,
      media: { image },
      core: { storage },
      response
    }) => {
      const [baseEntry] = await db
        .update(ideaBoxEntries)
        .set({ type: body.type, tags: body.tags, updated: new Date() })
        .where(eq(ideaBoxEntries.id, id))
        .returning()

      if (!baseEntry) {
        return response.notFound()
      }

      if (body.type === 'text') {
        await db
          .update(ideaBoxEntriesText)
          .set({ content: body.content })
          .where(eq(ideaBoxEntriesText.base_entry, id))
      } else if (body.type === 'image') {
        if (!image || typeof image === 'string') {
          return response.badRequest('Image is required for image entries')
        }

        const ref = await storage.save({ file: image })

        await db
          .update(ideaBoxEntriesImage)
          .set({ image: ref?.key ?? '' })
          .where(eq(ideaBoxEntriesImage.base_entry, id))
      } else if (body.type === 'link') {
        await db
          .update(ideaBoxEntriesLink)
          .set({ link: body.link })
          .where(eq(ideaBoxEntriesLink.base_entry, id))
      }

      return response.ok(serializeEntry(baseEntry))
    }
  )

export const remove = forge
  .mutation({
    description: 'Delete an idea',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), ideaBoxEntries)
      })
    },
    output: {
      NO_CONTENT: true
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    await db.delete(ideaBoxEntries).where(eq(ideaBoxEntries.id, id))

    return response.noContent()
  })

export const pin = forge
  .mutation({
    description: 'Toggle pin status of an idea',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), ideaBoxEntries)
      })
    },
    output: {
      OK: entryDto
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const idea = (await db.query.entries.findFirst({ where: { id } }))!

    const [updated] = await db
      .update(ideaBoxEntries)
      .set({ pinned: !idea.pinned })
      .where(eq(ideaBoxEntries.id, id))
      .returning()

    if (!updated) {
      return response.notFound()
    }

    return response.ok(serializeEntry(updated))
  })

export const archive = forge
  .mutation({
    description: 'Toggle archive status of an idea',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), ideaBoxEntries)
      })
    },
    output: {
      OK: entryDto
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const idea = (await db.query.entries.findFirst({ where: { id } }))!

    const [updated] = await db
      .update(ideaBoxEntries)
      .set({ archived: !idea.archived, pinned: false })
      .where(eq(ideaBoxEntries.id, id))
      .returning()

    if (!updated) {
      return response.notFound()
    }

    return response.ok(serializeEntry(updated))
  })

export const moveTo = forge
  .mutation({
    description: 'Move an idea to another folder',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), ideaBoxEntries)
      }),
      body: z.object({
        target: forge.existsIn(z.string(), ideaBoxFolders)
      })
    },
    output: {
      NO_CONTENT: true
    }
  })
  .callback(async ({ db, query: { id }, body: { target }, response }) => {
    await db
      .update(ideaBoxEntries)
      .set({ folder: target })
      .where(eq(ideaBoxEntries.id, id))

    return response.noContent()
  })

export const removeFromParent = forge
  .mutation({
    description: 'Move idea to parent folder',
    input: {
      query: z.object({
        id: forge.existsIn(z.string(), ideaBoxEntries)
      })
    },
    output: {
      NO_CONTENT: true
    }
  })
  .callback(async ({ db, query: { id }, response }) => {
    const currentIdea = (await db.query.entries.findFirst({ where: { id } }))!

    if (!currentIdea.folder) {
      return response.badRequest('Idea is not in any folder')
    }

    const currentFolder = await db.query.folders.findFirst({
      where: { id: currentIdea.folder }
    })

    if (!currentFolder) {
      return response.badRequest('Current folder does not exist')
    }

    await db
      .update(ideaBoxEntries)
      .set({ folder: currentFolder.parent || null })
      .where(eq(ideaBoxEntries.id, id))

    return response.noContent()
  })
