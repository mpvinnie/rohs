import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { ListProviderPartsUseCase } from './ListProviderPartsUseCase'

let providersRepository: FakeProvidersRepository
let partsRepository: FakePartsRepository
let listProviderParts: ListProviderPartsUseCase

describe('ListProviderParts', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    partsRepository = new FakePartsRepository()

    listProviderParts = new ListProviderPartsUseCase(
      providersRepository,
      partsRepository
    )
  })

  it('should be able to list the provider parts', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      code: '123456',
      provider_id: provider.id,
      description: 'Description'
    })

    const parts = await listProviderParts.execute({
      provider_id: provider.id
    })

    expect(parts.length).toBe(1)
    expect(parts[0]).toBe(part)
  })

  it('should not be able to list a non-existent provider parts', async () => {
    await expect(
      listProviderParts.execute({
        provider_id: 'non-existent-provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
