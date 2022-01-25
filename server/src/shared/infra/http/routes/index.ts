import { Router } from 'express'

import { managersRoutes } from '@modules/managers/infra/http/routes/managers.routes'

export const appRoutes = Router()

appRoutes.use('/managers', managersRoutes)
