import { Router } from 'express'

import { AuthenticateManagerController } from '@modules/managers/useCases/authenticateManager/AuthenticateManagerController'
import { CreateManagerController } from '@modules/managers/useCases/createManager/CreateManagerController'

export const managersRoutes = Router()

managersRoutes.post('/create', new CreateManagerController().handle)
managersRoutes.post('/authenticate', new AuthenticateManagerController().handle)
