import { Router } from 'express'

import { CreateManagerController } from '@modules/managers/useCases/createManager/CreateManagerController'

export const managersRoutes = Router()

managersRoutes.post('/create', new CreateManagerController().handle)
