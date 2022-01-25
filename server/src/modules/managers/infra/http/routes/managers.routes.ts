import { Router } from 'express'

import { AuthenticateManagerController } from '@modules/managers/useCases/authenticateManager/AuthenticateManagerController'
import { CreateManagerController } from '@modules/managers/useCases/createManager/CreateManagerController'
import { CreateProviderController } from '@modules/providers/useCases/createProvider/CreateProviderController'

import { ensureManagerAuthenticated } from '../middlewares/ensureManagerAuthenticated'

export const managersRoutes = Router()

managersRoutes.post('/create', new CreateManagerController().handle)
managersRoutes.post('/authenticate', new AuthenticateManagerController().handle)
managersRoutes.post(
  '/providers/create',
  ensureManagerAuthenticated,
  new CreateProviderController().handle
)
