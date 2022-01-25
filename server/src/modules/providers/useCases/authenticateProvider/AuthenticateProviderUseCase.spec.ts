import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { FakeHashProvider } from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider'
import { FakeTokenProvider } from '@shared/containers/providers/TokenProvider/fakes/FakeTokenProvider'
import { AppError } from '@shared/errors/AppError'

import { AuthenticateProviderUseCase } from './AuthenticateProviderUseCase'

let providersRepository: FakeProvidersRepository
let hashProvider: FakeHashProvider
let tokenProvider: FakeTokenProvider
let authenticateProvider: AuthenticateProviderUseCase

describe('AuthenticateProvider', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    hashProvider = new FakeHashProvider()
    tokenProvider = new FakeTokenProvider()

    authenticateProvider = new AuthenticateProviderUseCase(
      providersRepository,
      hashProvider,
      tokenProvider
    )
  })

  it('should be able to authenticate the provider', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'provider name',
      password: 'password',
      cnpj: '01234567890123',
      segment: 'segment'
    })

    const auth = await authenticateProvider.execute({
      id: '12345678',
      password: 'password'
    })

    expect(auth).toHaveProperty('token')
    expect(auth.provider).toBe(provider)
  })

  it('should not be able to authenticate a non-existent provider', async () => {
    await expect(
      authenticateProvider.execute({
        id: 'non-existent-provider-id',
        password: 'password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate the provider with a wrong password', async () => {
    await providersRepository.create({
      id: '12345678',
      name: 'provider name',
      password: 'password',
      cnpj: '01234567890123',
      segment: 'segment'
    })

    await expect(
      authenticateProvider.execute({
        id: '12345678',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
