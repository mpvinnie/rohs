import { Router } from 'express'

import { CreateProviderController } from '@modules/managers/useCases/createProvider/CreateProviderController'

import { ensureManagerAuthenticated } from '../middlewares/ensureManagerAuthenticated'

export const managerProviders = Router()

managerProviders.post(
  '/create',
  ensureManagerAuthenticated,
  new CreateProviderController().handle
)
