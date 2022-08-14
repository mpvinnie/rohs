import { inject, injectable } from 'tsyringe'

import { IDeleteNotificationDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { INotificationsRepository } from '@modules/notifications/repositories/interfaces/INotificationsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class DeleteNotificationUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute({ recipient_id, notification_id }: IDeleteNotificationDTO) {
    const provider = await this.providersRepository.findById(recipient_id)

    if (!provider) {
      throw new AppError(
        'None recipient found with the provided recipient_id',
        404
      )
    }

    const notification =
      await this.notificationsRepository.findByProviderAndNotificationId(
        recipient_id,
        notification_id
      )

    if (!notification) {
      throw new AppError(
        'None notification found with the provided notification_id',
        404
      )
    }

    await this.notificationsRepository.delete(notification)
  }
}
