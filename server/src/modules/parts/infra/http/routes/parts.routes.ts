import { Router } from 'express'

import { CreatePartController } from '@modules/parts/useCases/createPart/CreatePartController'
import { ListProviderPartsController } from '@modules/parts/useCases/listProviderParts/ListProviderPartsController'
import { SendPartForReviewController } from '@modules/parts/useCases/sendPartForReview/SendPartForReviewController'
import { ShowPartWithSubpartsController } from '@modules/parts/useCases/showPartWithSubparts/ShowPartWithSubpartsController'
import { UpdatePartController } from '@modules/parts/useCases/udpatePart/UpdatePartController'
import { ensureProviderAuthenticated } from '@modules/providers/infra/http/middlewares/ensureProviderAuthenticated'

export const partsRoutes = Router()

partsRoutes.use(ensureProviderAuthenticated)

partsRoutes.post('/', new CreatePartController().handle)
partsRoutes.get('/', new ListProviderPartsController().handle)
partsRoutes.patch(
  '/:id/sendForReview',
  new SendPartForReviewController().handle
)
partsRoutes.get('/:id', new ShowPartWithSubpartsController().handle)
partsRoutes.put('/:id', new UpdatePartController().handle)
