import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { AppError } from '@shared/errors/AppError'

import { ListPartsSentForReviewUseCase } from './ListPartsSentForReviewUseCase'

let managersRepository: FakeManagersRepository
let partsRepository: FakePartsRepository
let listPartsSentForReview: ListPartsSentForReviewUseCase

describe('ListPartsSentForReview', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    partsRepository = new FakePartsRepository()

    listPartsSentForReview = new ListPartsSentForReviewUseCase(
      managersRepository,
      partsRepository
    )
  })

  it('should be able to list all parts sent for review', async () => {
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

    const partSentForReview = await partsRepository.update({
      ...part,
      status: 'SENT_FOR_REVIEW'
    })

    const partsSentForReview = await listPartsSentForReview.execute({
      manager_id: manager.id
    })

    expect(partsSentForReview.length).toBe(1)
    expect(partsSentForReview[0]).toBe(partSentForReview)
  })

  it('should not be able to list all parts sent for review if manager non exists', async () => {
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
      listPartsSentForReview.execute({
        manager_id: 'non-existetent-manager-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
