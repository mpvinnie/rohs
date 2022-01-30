import { Router } from 'express'

import { CreatePartController } from '@modules/parts/useCases/createPart/CreatePartController'
import { ensureProviderAuthenticated } from '@modules/providers/infra/http/middlewares/ensureProviderAuthenticated'

export const partsRoutes = Router()

partsRoutes.use(ensureProviderAuthenticated)

partsRoutes.post('/', new CreatePartController().handle)
