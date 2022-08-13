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

  async findByProviderAndNotificationId(
    provider_id: string,
    notification_id: string
  ): Promise<Notification | undefined> {
    const notification = this.notifications.find(
      notification =>
        notification.recipient_id === provider_id &&
        notification.id === notification_id
    )

    return notification
  }

  async findUnreadByRecipientId(provider_id: string): Promise<Notification[]> {
    const unreadNotifications = this.notifications.filter(
      notification =>
        notification.recipient_id === provider_id && !notification.is_read
    )

    return unreadNotifications
  }

  async update(notification: Notification): Promise<Notification> {
    const findIndex = this.notifications.findIndex(
      findNotification => findNotification.id === notification.id
    )

    this.notifications[findIndex] = notification

    return this.notifications[findIndex]
  }
}
