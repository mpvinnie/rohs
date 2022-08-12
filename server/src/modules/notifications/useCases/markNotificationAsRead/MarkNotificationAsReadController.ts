import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IMarkNotificationAsReadDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { markNotificationAsReadSchema } from '@modules/notifications/schemas/notificationSchemas'
import validateParams from '@utils/validateParams'

import { MarkNotificationAsReadUseCase } from './MarkNotificationAsReadUseCase'

export class MarkNotificationAsReadController {
  async handle(request: Request, response: Response) {
    const { id: notification_id } = request.params

    const { provider_id } = request

    validateParams<IMarkNotificationAsReadDTO>(
      {
        notification_id,
        recipient_id: provider_id
      },
      markNotificationAsReadSchema
    )

    const markNotificationAsRead = container.resolve(
      MarkNotificationAsReadUseCase
    )

    const notification = await markNotificationAsRead.execute({
      notification_id,
      recipient_id: provider_id
    })

    return response.json(notification)
  }
}
