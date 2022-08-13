import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IMarkAllAsReadDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { markAllAsReadSchema } from '@modules/notifications/schemas/notificationSchemas'
import validateParams from '@utils/validateParams'

import { MarkAllAsReadUseCase } from './MarkAllAsReadUseCase'

export class MarkAllAsReadController {
  async handle(request: Request, response: Response) {
    const { provider_id } = request

    validateParams<IMarkAllAsReadDTO>({ provider_id }, markAllAsReadSchema)

    const markAllAsRead = container.resolve(MarkAllAsReadUseCase)

    const readNotification = await markAllAsRead.execute({
      provider_id
    })

    return response.json(readNotification)
  }
}
