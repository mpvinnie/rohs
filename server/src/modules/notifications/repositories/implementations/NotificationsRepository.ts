import { ICreateNotificationsDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { Notification } from '@prisma/client'
import { prisma } from '@shared/infra/prisma'

import { INotificationsRepository } from '../interfaces/INotificationsRepository'

export class NotificationsRepository implements INotificationsRepository {
  async create({
    provider_id,
    message
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notification = await prisma.notification.create({
      data: {
        provider_id,
        message
      }
    })
    return notification
  }
}
