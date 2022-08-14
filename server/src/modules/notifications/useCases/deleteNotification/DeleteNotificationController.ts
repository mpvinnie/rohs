import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IDeleteNotificationDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { deleteNotificationSchema } from '@modules/notifications/schemas/notificationSchemas'
import validateParams from '@utils/validateParams'

import { DeleteNotificationUseCase } from './DeleteNotificationUseCase'

export class DeleteNotificationController {
  async handle(request: Request, response: Response) {
    const { id: notification_id } = request.params

    const { provider_id: recipient_id } = request

    validateParams<IDeleteNotificationDTO>(
      { recipient_id, notification_id },
      deleteNotificationSchema
    )

    const deleteNotification = container.resolve(DeleteNotificationUseCase)

    await deleteNotification.execute({
      recipient_id,
      notification_id
    })

    return response.send()
  }
}
