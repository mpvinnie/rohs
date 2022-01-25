import { Router } from 'express'

import { managersRoutes } from '@modules/managers/infra/http/routes/managers.routes'
import { providersRoutes } from '@modules/providers/infra/http/routes/providers.routes'

export const appRoutes = Router()

appRoutes.use('/managers', managersRoutes)
appRoutes.use('/providers', providersRoutes)
