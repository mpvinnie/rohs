import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { ShowPartUseCase } from './ShowPartUseCase'

let providersRepository: FakeProvidersRepository
let partsRepository: FakePartsRepository
let showPart: ShowPartUseCase

describe('ShowPart', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    partsRepository = new FakePartsRepository()

    showPart = new ShowPartUseCase(providersRepository, partsRepository)
  })

  it('should be able to show a part', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      cnpj: '12345678901234',
      name: 'Provider Name',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      code: '123456',
      description: 'Description',
      provider_id: provider.id,
      comment: 'Comment'
    })

    const partToShow = await showPart.execute({
      provider_id: provider.id,
      part_id: part.id
    })

    expect(partToShow).toBe(part)
  })

  it('should not be able to show a non-existent provider part', async () => {
    const part = await partsRepository.create({
      code: '123456',
      description: 'Description',
      provider_id: 'provider_id',
      comment: 'Comment'
    })

    await expect(
      showPart.execute({
        provider_id: 'non-existent-provider-id',
        part_id: part.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to show a non-existent part', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      cnpj: '12345678901234',
      name: 'Provider Name',
      password: 'password',
      segment: 'Segment'
    })

    await expect(
      showPart.execute({
        provider_id: provider.id,
        part_id: 'non-existent-part-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
