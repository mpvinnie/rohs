import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { AppError } from '@shared/errors/AppError'

import { ListPartsAvailableForReviewUseCase } from './ListPartsAvailableForReviewUseCase'

let managersRepository: FakeManagersRepository
let partsRepository: FakePartsRepository
let listPartsAvailableForReview: ListPartsAvailableForReviewUseCase

describe('ListPartsAvailableForReview', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    partsRepository = new FakePartsRepository()

    listPartsAvailableForReview = new ListPartsAvailableForReviewUseCase(
      managersRepository,
      partsRepository
    )
  })

  it('should be able to list all parts available for review', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    await partsRepository.create({
      provider_id: 'provider_id_1',
      code: '123456',
      description: 'Description'
    })

    const part = await partsRepository.create({
      provider_id: 'provider_id_2',
      code: '123456',
      description: 'Description'
    })

    const partAvailableForReview = await partsRepository.update({
      ...part,
      status: 'SENT_FOR_REVIEW'
    })

    const partsAvailableForReview = await listPartsAvailableForReview.execute({
      manager_id: manager.id
    })

    expect(partsAvailableForReview.length).toBe(1)
    expect(partsAvailableForReview[0]).toBe(partAvailableForReview)
  })

  it('should not be able to list all parts available for review if manager non exists', async () => {
    await partsRepository.create({
      provider_id: 'provider_id_1',
      code: '123456',
      description: 'Description'
    })

    const part = await partsRepository.create({
      provider_id: 'provider_id_2',
      code: '123456',
      description: 'Description'
    })

    await partsRepository.update({
      ...part,
      status: 'SENT_FOR_REVIEW'
    })

    await expect(
      listPartsAvailableForReview.execute({
        manager_id: 'non-existetent-manager-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
