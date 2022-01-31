import { Router } from 'express'

import { CreatePartController } from '@modules/parts/useCases/createPart/CreatePartController'
import { ListProviderPartsController } from '@modules/parts/useCases/listProviderParts/ListProviderPartsController'
import { ShowPartController } from '@modules/parts/useCases/showPart/ShowPartController'
import { ensureProviderAuthenticated } from '@modules/providers/infra/http/middlewares/ensureProviderAuthenticated'

export const partsRoutes = Router()

partsRoutes.use(ensureProviderAuthenticated)

partsRoutes.post('/', new CreatePartController().handle)
partsRoutes.get('/', new ListProviderPartsController().handle)
partsRoutes.get('/:id', new ShowPartController().handle)