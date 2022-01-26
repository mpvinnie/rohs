import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { FakeStorageProvider } from '@shared/containers/providers/StorageProvider/fakes/FakeStorageProvider'
import { AppError } from '@shared/errors/AppError'

import { UpdateProviderAvatarUseCase } from './UpdateProviderAvatarUseCase'

let providersRepository: FakeProvidersRepository
let storageProvider: FakeStorageProvider
let updateProviderAvatar: UpdateProviderAvatarUseCase

describe('UpdateProviderAvatar', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    storageProvider = new FakeStorageProvider()

    updateProviderAvatar = new UpdateProviderAvatarUseCase(
      providersRepository,
      storageProvider
    )
  })

  it('should be able to update the provider avatar', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '01234567890123',
      password: 'password',
      segment: 'Segment'
    })

    const updatedProvider = await updateProviderAvatar.execute({
      avatar_filename: 'avatar_filename',
      provider_id: provider.id
    })

    expect(updatedProvider.avatar).toBe('avatar_filename')
  })

  it('should not be able to update the avatar from a non-existent provider', async () => {
    await expect(
      updateProviderAvatar.execute({
        avatar_filename: 'avatar_filename',
        provider_id: 'non-existent-provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update an existent provider avatar', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '01234567890123',
      password: 'password',
      segment: 'Segment'
    })

    await updateProviderAvatar.execute({
      avatar_filename: 'avatar_filename_2',
      provider_id: provider.id
    })

    await updateProviderAvatar.execute({
      avatar_filename: 'avatar_filename_2',
      provider_id: provider.id
    })

    expect(provider.avatar).toBe('avatar_filename_2')
  })
})
