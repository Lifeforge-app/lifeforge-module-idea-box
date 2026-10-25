import { ZoomableImage } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'
import type { IdeaBoxIdea } from '@/providers/IdeaBoxProvider'

import CustomZoomContent from './components/CustomZoomContent'
import IdeaWrapper from './components/IdeaWrapper'

function EntryImage({ entry }: { entry: IdeaBoxIdea }) {
  if (entry.type !== 'image') {
    return null
  }

  return (
    <IdeaWrapper entry={entry}>
      <ZoomableImage
        shadow
        alt=""
        fallback={null}
        r="lg"
        src={forgeAPI.getMedia({ key: entry.image })}
        zoomMargin={40}
        zoomProps={{ ZoomContent: CustomZoomContent }}
      />
    </IdeaWrapper>
  )
}

export default EntryImage
