import { inject, injectable } from 'tsyringe'

import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/interfaces/IStorageProvider'
import { AppError } from '@shared/errors/AppError'

export interface IRequest {
  provider_id: string
  avatar_filename: string
}

@injectable()
export class UpdateProviderAvatarUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ provider_id, avatar_filename }: IRequest) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError(
        'You cannot update avatar from a non-existent provider',
        404
      )
    }

    if (provider.avatar) {
      await this.storageProvider.deleteFile(provider.avatar, 'avatar')
    }

    const filename = await this.storageProvider.saveFile(
      avatar_filename,
      'avatar'
    )

    provider.avatar = filename

    const updatedProvider = await this.providersRepository.update(provider)

    return updatedProvider
  }
}
