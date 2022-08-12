import { v4 as uuid } from 'uuid'

import { ICreateNotificationDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { Notification } from '@prisma/client'

import { INotificationsRepository } from '../interfaces/INotificationsRepository'

export class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = []

  async create({
    recipient_id,
    content
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification: Notification = {
      id: uuid(),
      recipient_id,
      content,
      is_read: false,
      created_at: new Date()
    }

    this.notifications.push(notification)

    return notification
  }

  async findByRecipientId(recipient_id: string): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      notification => notification.recipient_id === recipient_id
    )

    return notifications
  }
}
