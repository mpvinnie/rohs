import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IListProviderNotificationsDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { listProviderNotificationsSchema } from '@modules/notifications/schemas/notificationSchemas'
import validateParams from '@utils/validateParams'

import { ListProviderNotificationsUseCase } from './ListProviderNotificationsUseCase'

export class ListProviderNotificationsController {
  async handle(request: Request, response: Response) {
    const { provider_id } = request

    validateParams<IListProviderNotificationsDTO>(
      { recipient_id: provider_id },
      listProviderNotificationsSchema
    )

    const listProviderNotifications = container.resolve(
      ListProviderNotificationsUseCase
    )

    const notifications = await listProviderNotifications.execute({
      recipient_id: provider_id
    })

    return response.json(notifications)
  }
}
