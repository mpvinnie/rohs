import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { CreatePartUseCase } from './CreatePartUseCase'

let providersRepository: FakeProvidersRepository
let partsRepository: FakePartsRepository
let createPart: CreatePartUseCase

describe('CreatePart', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    partsRepository = new FakePartsRepository()

    createPart = new CreatePartUseCase(providersRepository, partsRepository)
  })

  it('should be able to create a part', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12346578901234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await createPart.execute({
      provider_id: provider.id,
      code: '123456',
      description: 'Description',
      comment: 'Comment'
    })

    expect(part).toHaveProperty('id')
  })

  it('should not be able to create a part to a non-existent provider', async () => {
    await expect(
      createPart.execute({
        provider_id: 'non-existent-provider-id',
        code: '123456',
        description: 'Description',
        comment: 'Comment'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a part with an existent part code', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12346578901234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await createPart.execute({
      provider_id: provider.id,
      code: '123456',
      description: 'Description',
      comment: 'Comment'
    })

    await expect(
      createPart.execute({
        provider_id: provider.id,
        code: part.code,
        description: 'Description',
        comment: 'Comment'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
