import { inject, injectable } from 'tsyringe'

import { IMarkNotificationAsReadDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { INotificationsRepository } from '@modules/notifications/repositories/interfaces/INotificationsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class MarkNotificationAsReadUseCase {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository
  ) {}

  async execute({ notification_id, recipient_id }: IMarkNotificationAsReadDTO) {
    const provider = await this.providersRepository.findById(recipient_id)

    if (!provider) {
      throw new AppError('No provider found with this id', 404)
    }

    const notification =
      await this.notificationsRepository.findByProviderAndNotificationId(
        provider.id,
        notification_id
      )

    if (!notification) {
      throw new AppError(
        'No notification found with the provider_id and notification_id provided',
        404
      )
    }

    if (notification.is_read) {
      return notification
    }

    notification.is_read = true

    const readNotification = await this.notificationsRepository.update(
      notification
    )

    return readNotification
  }
}
