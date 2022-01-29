import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { ListProvidersUseCase } from '@modules/managers/useCases/listProviders/ListProvidersUseCase'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

let managersRepository: FakeManagersRepository
let providersRepository: FakeProvidersRepository
let listProviders: ListProvidersUseCase

describe('ListProviders', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    providersRepository = new FakeProvidersRepository()

    listProviders = new ListProvidersUseCase(
      managersRepository,
      providersRepository
    )
  })

  it('should be able to list all providers', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    const providers = await listProviders.execute({
      manager_id: manager.id
    })

    expect(providers.length).toBe(1)
    expect(providers[0]).toBe(provider)
  })

  it('should not be able to list providers if manager not exists', async () => {
    await expect(
      listProviders.execute({
        manager_id: 'non-existent-manager-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
