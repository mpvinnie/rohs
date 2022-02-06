import { Router } from 'express'

import { CreatePartController } from '@modules/parts/useCases/createPart/CreatePartController'
import { ListProviderPartsController } from '@modules/parts/useCases/listProviderParts/ListProviderPartsController'
import { SendPartToAnalysisController } from '@modules/parts/useCases/sendPartToAnalysis/SendPartToAnalysisController'
import { ensureProviderAuthenticated } from '@modules/providers/infra/http/middlewares/ensureProviderAuthenticated'

export const partsRoutes = Router()

partsRoutes.use(ensureProviderAuthenticated)

partsRoutes.post('/', new CreatePartController().handle)
partsRoutes.get('/', new ListProviderPartsController().handle)
partsRoutes.patch(
  '/:id/sendToAnalysis',
  new SendPartToAnalysisController().handle
)
