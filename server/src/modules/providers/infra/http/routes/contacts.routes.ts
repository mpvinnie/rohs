import { Router } from 'express'

import { CreateContactController } from '@modules/providers/useCases/createContact/CreateContactController'
import { ListProviderContactsController } from '@modules/providers/useCases/listProviderContacts/ListProviderContactsController'

import { ensureProviderAuthenticated } from '../middlewares/ensureProviderAuthenticated'

export const contactsRoutes = Router()

contactsRoutes.get(
  '/',
  ensureProviderAuthenticated,
  new ListProviderContactsController().handle
)

contactsRoutes.post(
  '/',
  ensureProviderAuthenticated,
  new CreateContactController().handle
)
