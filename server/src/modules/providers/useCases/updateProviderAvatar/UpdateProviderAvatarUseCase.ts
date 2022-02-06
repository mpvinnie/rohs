import { inject, injectable } from 'tsyringe'

import { IUpdateProviderAvatarDTO } from '@modules/providers/dtos/ProvidersDTO'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { IStorageProvider } from '@shared/containers/providers/StorageProvider/interfaces/IStorageProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class UpdateProviderAvatarUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ provider_id, avatar_filename }: IUpdateProviderAvatarDTO) {
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
