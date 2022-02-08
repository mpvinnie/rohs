import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeReviewsRepository } from '@modules/reviews/repositories/fakes/FakeReviewsRepository'
import { AppError } from '@shared/errors/AppError'

import { ReviewPartUseCase } from './ReviewPartUseCase'

let managersRepository: FakeManagersRepository
let partsRepository: FakePartsRepository
let reviewsRepository: FakeReviewsRepository
let reviewPart: ReviewPartUseCase

describe('ReviewPart', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    partsRepository = new FakePartsRepository()
    reviewsRepository = new FakeReviewsRepository()

    reviewPart = new ReviewPartUseCase(
      managersRepository,
      partsRepository,
      reviewsRepository
    )
  })

  it('should be able to review a part', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const part = await partsRepository.create({
      code: '123456',
      provider_id: 'provider_id',
      description: 'Description'
    })

    const partSentForReview = await partsRepository.update({
      ...part,
      status: 'SENT_FOR_REVIEW'
    })

    const partForReview = await reviewPart.execute({
      manager_id: manager.id,
      part_id: partSentForReview.id
    })

    expect(partForReview).toHaveProperty('id')
    expect(partForReview.part_id).toBe(partSentForReview.id)
    expect(partForReview.part.status).toBe('UNDER_REVIEW')
  })

  it('should not be able to review a part if provider non exists', async () => {
    const part = await partsRepository.create({
      code: '123456',
      provider_id: 'provider_id',
      description: 'Description'
    })

    const partSentForReview = await partsRepository.update({
      ...part,
      status: 'SENT_FOR_REVIEW'
    })

    await expect(
      reviewPart.execute({
        manager_id: 'non-existent-manager-id',
        part_id: partSentForReview.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to review a non-existent part', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    await expect(
      reviewPart.execute({
        manager_id: manager.id,
        part_id: 'non-existent-part-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to review a part if its didn`t send for review', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const partNotSentForReview = await partsRepository.create({
      code: '123456',
      provider_id: 'provider_id',
      description: 'Description'
    })

    await expect(
      reviewPart.execute({
        manager_id: manager.id,
        part_id: partNotSentForReview.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
