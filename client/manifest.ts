import { lazy } from 'react'

import { createForgeModule } from '@lifeforge/federation'

import type { Contract } from './contract'

const { forgeAPI, ...manifest } = createForgeModule<Contract>({
  routes: {
    '/': lazy(() => import('@/pages/Containers')),
    '/:id/*': lazy(() => import('@/pages/Ideas'))
  }
})

export default manifest

export { forgeAPI }
