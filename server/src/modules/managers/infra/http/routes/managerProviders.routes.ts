import { Router } from 'express'

import { CreateProviderController } from '@modules/managers/useCases/createProvider/CreateProviderController'
import { ListProvidersController } from '@modules/managers/useCases/listProviders/ListProvidersController'

import { ensureManagerAuthenticated } from '../middlewares/ensureManagerAuthenticated'

export const managerProviders = Router()

managerProviders.use(ensureManagerAuthenticated)

managerProviders.post('/', new CreateProviderController().handle)

managerProviders.get('/', new ListProvidersController().handle)
