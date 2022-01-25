import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakeHashProvider } from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider'
import { FakePasswordProvider } from '@shared/containers/providers/PasswordProvider/fakes/FakePasswordProvider'
import { AppError } from '@shared/errors/AppError'

import { CreateManagerUseCase } from './CreateManagerUseCase'

let managersRepository: FakeManagersRepository
let passwordProvider: FakePasswordProvider
let hashProvider: FakeHashProvider
let createManager: CreateManagerUseCase

describe('CreateManager', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    passwordProvider = new FakePasswordProvider()
    hashProvider = new FakeHashProvider()

    createManager = new CreateManagerUseCase(
      managersRepository,
      passwordProvider,
      hashProvider
    )
  })

  it('should be able to create a new manager', async () => {
    const manager = await createManager.execute({
      email: 'johndoe@example.com'
    })

    expect(manager).toHaveProperty('id')
    expect(manager.password).not.toBeNull()
    expect(manager.email).toBe('johndoe@example.com')
  })

  it('should not be able to create a manager with an existent email', async () => {
    await createManager.execute({
      email: 'johndoe@example.com'
    })

    await expect(
      createManager.execute({
        email: 'johndoe@example.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
