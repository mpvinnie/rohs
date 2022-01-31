import { Router } from 'express'

import uploadConfig from '@config/upload'
import { CreateSubpartController } from '@modules/parts/useCases/createSubpart/CreateSubpartController'
import { ensureProviderAuthenticated } from '@modules/providers/infra/http/middlewares/ensureProviderAuthenticated'

export const subpartsRoutes = Router()

subpartsRoutes.use(ensureProviderAuthenticated)

const { upload } = uploadConfig

subpartsRoutes.post(
  '/:part_id',
  upload.fields([
    {
      name: 'gwi_11a1',
      maxCount: 1
    },
    {
      name: 'fisp_msds',
      maxCount: 1
    },
    {
      name: 'rohs_report',
      maxCount: 1
    }
  ]),
  new CreateSubpartController().handle
)
