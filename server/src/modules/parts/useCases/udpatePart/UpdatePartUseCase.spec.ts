import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { UpdatePartUseCase } from './UpdatePartUseCase'

let providersRepository: FakeProvidersRepository
let partsRepository: FakePartsRepository
let updatePart: UpdatePartUseCase

describe('UpdatePart', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    partsRepository = new FakePartsRepository()

    updatePart = new UpdatePartUseCase(providersRepository, partsRepository)
  })

  it('should be able to update a part', async () => {
    const provider = await providersRepository.create({
      id: '123456',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      code: '12345678',
      provider_id: provider.id,
      description: 'Description'
    })

    const updatedPart = await updatePart.execute({
      provider_id: provider.id,
      part_id: part.id,
      description: 'Updated Description'
    })

    const gotUpdatedPart = await partsRepository.findById(part.id)

    expect(gotUpdatedPart).toBe(updatedPart)
  })

  it('should not be able to update a part if provider non exists', async () => {
    const part = await partsRepository.create({
      code: '12345678',
      provider_id: 'non-existent-provider-id',
      description: 'Description'
    })

    await expect(
      updatePart.execute({
        provider_id: 'non-existent-provider-id',
        part_id: part.id,
        description: 'Updated Description',
        comment: 'Comment'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update a non-existent part', async () => {
    const provider = await providersRepository.create({
      id: '123456',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    await expect(
      updatePart.execute({
        provider_id: provider.id,
        part_id: 'non-existent-part-id',
        description: 'Updated Description',
        comment: 'Comment'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update a part if its status is not `not_sent` and not `disapproved`', async () => {
    const provider = await providersRepository.create({
      id: '123456',
      name: 'Provider Name',
      cnpj: '12345679801234',
      password: 'password',
      segment: 'Segment'
    })

    const part = await partsRepository.create({
      code: '12345678',
      provider_id: provider.id,
      description: 'Description'
    })

    part.status = 'APPROVED'

    await expect(
      updatePart.execute({
        provider_id: provider.id,
        part_id: part.id,
        description: 'Updated Description',
        comment: 'Comment'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
