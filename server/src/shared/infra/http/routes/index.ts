import { Router } from 'express'

import { managersRoutes } from '@modules/managers/infra/http/routes/managers.routes'
import { contactsRoutes } from '@modules/providers/infra/http/routes/contacts.routes'
import { providersRoutes } from '@modules/providers/infra/http/routes/providers.routes'

export const appRoutes = Router()

appRoutes.use('/managers', managersRoutes)
appRoutes.use('/providers', providersRoutes)
appRoutes.use('/providers/contacts', contactsRoutes)
