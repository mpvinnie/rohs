import { ICreateNotificationsDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { Notification } from '@prisma/client'

export interface INotificationsRepository {
  create(data: ICreateNotificationsDTO): Promise<Notification>
}
