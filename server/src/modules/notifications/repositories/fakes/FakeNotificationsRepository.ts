import { v4 as uuid } from 'uuid'

import { ICreateNotificationsDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { Notification } from '@prisma/client'

import { INotificationsRepository } from '../interfaces/INotificationsRepository'

export class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = []

  async create({
    provider_id,
    message
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notification: Notification = {
      id: uuid(),
      provider_id,
      message,
      read: false,
      created_at: new Date()
    }

    this.notifications.push(notification)

    return notification
  }
}
