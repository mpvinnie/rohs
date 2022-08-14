import { ICreateNotificationDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { Notification } from '@prisma/client'

export interface INotificationsRepository {
  create(data: ICreateNotificationDTO): Promise<Notification>
  findByRecipientId(recipient_id: string): Promise<Notification[]>
  findByProviderAndNotificationId(
    provider_id: string,
    notification_id: string
  ): Promise<Notification | null | undefined>
  findUnreadByRecipientId(provider_id: string): Promise<Notification[]>
  update(notification: Notification): Promise<Notification>
  delete(notification: Notification): Promise<void>
}
