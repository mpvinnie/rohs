import { inject, injectable } from 'tsyringe'

import { IMarkAllAsReadDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { INotificationsRepository } from '@modules/notifications/repositories/interfaces/INotificationsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class MarkAllAsReadUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute({ provider_id }: IMarkAllAsReadDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError(
        'None provider found with the provided provider_id',
        404
      )
    }

    const unreadNotifications =
      await this.notificationsRepository.findUnreadByRecipientId(provider_id)

    if (!unreadNotifications.length) {
      throw new AppError('All notification has been read')
    }

    unreadNotifications.forEach(async notification => {
      notification.is_read = true
      await this.notificationsRepository.update(notification)
      return notification
    })

    return unreadNotifications
  }
}
