import { Router } from 'express'

import { ListProviderNotificationsController } from '@modules/notifications/useCases/listProviderNotifications/ListProviderNotificationsController'
import { ensureProviderAuthenticated } from '@modules/providers/infra/http/middlewares/ensureProviderAuthenticated'

export const notificationsRoutes = Router()

notificationsRoutes.use(ensureProviderAuthenticated)

notificationsRoutes.get('/', new ListProviderNotificationsController().handle)
