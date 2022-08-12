import { inject, injectable } from 'tsyringe'

import { IListProviderNotificationsDTO } from '@modules/notifications/dtos/NotificationsDTO'
import { INotificationsRepository } from '@modules/notifications/repositories/interfaces/INotificationsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ListProviderNotificationsUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  async execute({ recipient_id }: IListProviderNotificationsDTO) {
    const provider = await this.providersRepository.findById(recipient_id)

    if (!provider) {
      throw new AppError('No provider find for this id', 404)
    }

    const notifications = await this.notificationsRepository.findByRecipientId(
      recipient_id
    )

    return notifications
  }
}
