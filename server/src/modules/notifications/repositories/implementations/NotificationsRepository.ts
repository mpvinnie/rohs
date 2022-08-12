import { ICreateNotificationDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { Notification } from '@prisma/client'
import { prisma } from '@shared/infra/prisma'

import { INotificationsRepository } from '../interfaces/INotificationsRepository'

export class NotificationsRepository implements INotificationsRepository {
  async create({
    recipient_id,
    content
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = await prisma.notification.create({
      data: { recipient_id, content }
    })

    return notification
  }

  async findByRecipientId(recipient_id: string): Promise<Notification[]> {
    const notifications = await prisma.notification.findMany({
      where: { recipient_id }
    })

    return notifications
  }

  async findByProviderAndNotificationId(
    provider_id: string,
    notification_id: string
  ): Promise<Notification | null> {
    const notification = await prisma.notification.findFirst({
      where: {
        recipient_id: provider_id,
        id: notification_id
      }
    })

    return notification
  }

  async update({ id, is_read }: Notification): Promise<Notification> {
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: {
        is_read
      }
    })

    return updatedNotification
  }
}
