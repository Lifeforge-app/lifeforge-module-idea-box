import { useModuleTranslation } from '@lifeforge/localization'
import { Flex, Grid, Icon, Text, WithQuery } from '@lifeforge/ui'

import { useIdeaBoxContext } from '@/providers/IdeaBoxProvider'

import FolderItem from './components/FolderItem'

function FolderList() {
  const { t } = useModuleTranslation()
  const { foldersQuery } = useIdeaBoxContext()

  return (
    <>
      <Flex as="h2" align="center" gap="sm" mb="sm">
        <Icon color="muted" icon="tabler:folder" size="1.5rem" />
        <Text color="muted" size="lg" weight="medium">
          {t('entryType.folder')}
        </Text>
      </Flex>
      <WithQuery query={foldersQuery}>
        {folders => (
          <Grid gap="sm" mt="sm" templateCols={{ base: 1, md: 2, lg: 3 }}>
            {folders.map(folder => (
              <FolderItem key={folder.id} folder={folder} />
            ))}
          </Grid>
        )}
      </WithQuery>
    </>
  )
}

export default FolderList
