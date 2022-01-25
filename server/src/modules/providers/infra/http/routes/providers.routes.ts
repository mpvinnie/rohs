import { Router } from 'express'

import { AuthenticateProviderController } from '@modules/providers/useCases/authenticateProvider/AuthenticateProviderController'

export const providersRoutes = Router()

providersRoutes.post(
  '/authenticate',
  new AuthenticateProviderController().handle
)
