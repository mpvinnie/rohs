import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { FakeHashProvider } from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider'
import { FakePasswordProvider } from '@shared/containers/providers/PasswordProvider/fakes/FakePasswordProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateProviderUseCase } from './CreateProviderUseCase'

let managersRepository: FakeManagersRepository
let providersRepository: FakeProvidersRepository
let passwordProvider: FakePasswordProvider
let hashProvider: FakeHashProvider
let createProvider: CreateProviderUseCase

describe('CreateProvider', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    providersRepository = new FakeProvidersRepository()
    passwordProvider = new FakePasswordProvider()
    hashProvider = new FakeHashProvider()

    createProvider = new CreateProviderUseCase(
      managersRepository,
      providersRepository,
      passwordProvider,
      hashProvider
    )
  })

  it('should be able to create a new provider', async () => {
    const manager = await managersRepository.create({
      email: 'johndoemanager@example.com',
      password: 'password'
    })

    const provider = await createProvider.execute({
      manager_id: manager.id,
      name: 'company provider name',
      cnpj: '012345678901234',
      segment: 'segment type'
    })

    expect(provider).toHaveProperty('id')
    expect(provider).toHaveProperty('password')
    expect(provider.segment_id).not.toBeNull()
  })

  it('should not be able to create a new provider with a non-existent manager', async () => {
    await expect(
      createProvider.execute({
        manager_id: 'non-existent-manager-id',
        name: 'company provider name',
        cnpj: '012345678901234',
        segment: 'segment type'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new provider with an existent cnpj', async () => {
    const manager = await managersRepository.create({
      email: 'johndoemanager@example.com',
      password: 'password'
    })

    await createProvider.execute({
      manager_id: manager.id,
      name: 'company provider name',
      cnpj: '012345678901234',
      segment: 'segment type'
    })

    await expect(
      createProvider.execute({
        manager_id: manager.id,
        name: 'company provider name',
        cnpj: '012345678901234',
        segment: 'segment type'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new provider with an existent id', async () => {
    jest
      .spyOn(providersRepository, 'findById')
      .mockImplementationOnce(async () => {
        const provider = await providersRepository.create({
          id: '12345678',
          name: 'company provider name',
          cnpj: '12345678901234',
          password: 'password',
          segment: 'segment'
        })

        return provider
      })

    const manager = await managersRepository.create({
      email: 'johndoemanager@example.com',
      password: 'password'
    })

    await expect(
      createProvider.execute({
        manager_id: manager.id,
        name: 'company provider name',
        cnpj: '012345678901234',
        segment: 'segment type'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
