import { Router } from 'express'

import { ListProviderNotificationsController } from '@modules/notifications/useCases/listProviderNotifications/ListProviderNotificationsController'
import { MarkNotificationAsReadController } from '@modules/notifications/useCases/markNotificationAsRead/MarkNotificationAsReadController'
import { ensureProviderAuthenticated } from '@modules/providers/infra/http/middlewares/ensureProviderAuthenticated'

export const notificationsRoutes = Router()

notificationsRoutes.use(ensureProviderAuthenticated)

notificationsRoutes.get('/', new ListProviderNotificationsController().handle)
notificationsRoutes.patch('/:id', new MarkNotificationAsReadController().handle)
