import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakeHashProvider } from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider'
import { FakeTokenProvider } from '@shared/containers/providers/TokenProvider/fakes/FakeTokenProvider'
import { AppError } from '@shared/errors/AppError'

import { AuthenticateManagerUseCase } from './AuthenticateManagerUseCase'

let managersRepository: FakeManagersRepository
let hashProvider: FakeHashProvider
let tokenProvider: FakeTokenProvider
let authenticateManager: AuthenticateManagerUseCase

describe('AuthenticateManager', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    hashProvider = new FakeHashProvider()
    tokenProvider = new FakeTokenProvider()

    authenticateManager = new AuthenticateManagerUseCase(
      managersRepository,
      hashProvider,
      tokenProvider
    )
  })

  it('should be able to authenticate the manager', async () => {
    const manager = await managersRepository.create({
      email: 'johndoe@example.com',
      password: 'password'
    })

    const auth = await authenticateManager.execute({
      email: 'johndoe@example.com',
      password: 'password'
    })

    expect(auth).toHaveProperty('token')
    expect(auth.manager).toBe(manager)
  })

  it('should not be able to authenticate a non-existent manager', async () => {
    await expect(
      authenticateManager.execute({
        email: 'non-exitent-manager-email',
        password: 'password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to authenticate the manager with a wrong password', async () => {
    await managersRepository.create({
      email: 'johndoe@example.com',
      password: 'password'
    })

    await expect(
      authenticateManager.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
