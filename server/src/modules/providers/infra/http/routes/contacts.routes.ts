import { Router } from 'express'

import { CreateContactController } from '@modules/providers/useCases/createContact/CreateContactController'

import { ensureProviderAuthenticated } from '../middlewares/ensureProviderAuthenticated'

export const contactsRoutes = Router()

contactsRoutes.post(
  '/',
  ensureProviderAuthenticated,
  new CreateContactController().handle
)
