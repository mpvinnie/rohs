import { Router } from 'express'

import { managerProviders } from '@modules/managers/infra/http/routes/managerProviders.routes'
import { managersRoutes } from '@modules/managers/infra/http/routes/managers.routes'
import { managerPartsRoutes } from '@modules/managers/infra/http/routes/parts.routes'
import { partsRoutes } from '@modules/parts/infra/http/routes/parts.routes'
import { subpartsRoutes } from '@modules/parts/infra/http/routes/subparts.routes'
import { contactsRoutes } from '@modules/providers/infra/http/routes/contacts.routes'
import { profileRoutes } from '@modules/providers/infra/http/routes/profile.routes'
import { providersRoutes } from '@modules/providers/infra/http/routes/providers.routes'

export const appRoutes = Router()

appRoutes.use('/managers', managersRoutes)
appRoutes.use('/managers/providers', managerProviders)
appRoutes.use('/managers/parts', managerPartsRoutes)

appRoutes.use('/providers', providersRoutes)
appRoutes.use('/providers/contacts', contactsRoutes)
appRoutes.use('/providers/profile', profileRoutes)
appRoutes.use('/providers/parts', partsRoutes)
appRoutes.use('/providers/parts/subparts', subpartsRoutes)
