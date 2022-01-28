import { Router } from 'express'

import { CreateContactController } from '@modules/providers/useCases/createContact/CreateContactController'
import { DeleteContactController } from '@modules/providers/useCases/deleteContact/DeleteContactController'
import { ListProviderContactsController } from '@modules/providers/useCases/listProviderContacts/ListProviderContactsController'
import { UpdateContactController } from '@modules/providers/useCases/updateContact/UpdateContactController'

import { ensureProviderAuthenticated } from '../middlewares/ensureProviderAuthenticated'

export const contactsRoutes = Router()

contactsRoutes.use(ensureProviderAuthenticated)

contactsRoutes.get('/', new ListProviderContactsController().handle)

contactsRoutes.post('/', new CreateContactController().handle)

contactsRoutes.delete('/:id', new DeleteContactController().handle)

contactsRoutes.put('/:id', new UpdateContactController().handle)
