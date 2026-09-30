import Zoom from 'react-medium-image-zoom'

import { Box } from '@lifeforge/ui'

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
      <Zoom
        ZoomContent={CustomZoomContent}
        zoomImg={{
          src: forgeAPI.getMedia({
            collectionId: entry.child.collectionId,
            recordId: entry.child.id,
            fieldId: entry.image
          })
        }}
        zoomMargin={40}
      >
        <Box asChild r="lg" shadow>
          <img
            alt={''}
            src={forgeAPI.getMedia({
              collectionId: entry.child.collectionId,
              recordId: entry.child.id,
              fieldId: entry.image
            })}
          />
        </Box>
      </Zoom>
    </IdeaWrapper>
  )
}

export default EntryImage
