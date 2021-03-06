import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeReviewsRepository } from '@modules/reviews/repositories/fakes/FakeReviewsRepository'
import { AppError } from '@shared/errors/AppError'

import { ApproveReviewUseCase } from './ApproveReviewUseCase'

let managersRepository: FakeManagersRepository
let partsRepository: FakePartsRepository
let reviewsRepository: FakeReviewsRepository
let approveReview: ApproveReviewUseCase

describe('ApproveReview', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    partsRepository = new FakePartsRepository()
    reviewsRepository = new FakeReviewsRepository()

    approveReview = new ApproveReviewUseCase(
      managersRepository,
      partsRepository,
      reviewsRepository
    )
  })

  it('should be able to approve a review', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    const review = await reviewsRepository.create({
      manager_id: manager.id,
      part_id: part.id
    })

    const approvedReview = await approveReview.execute({
      manager_id: manager.id,
      review_id: review.id
    })

    expect(approvedReview.id).toBe(review.id)
    expect(approvedReview.resolve).toBe('APPROVED')
  })

  it('should not be able to approve a review if manager non exists', async () => {
    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    const review = await reviewsRepository.create({
      manager_id: 'manager_id',
      part_id: part.id
    })

    await expect(
      approveReview.execute({
        manager_id: 'non-existent-manager-id',
        review_id: review.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to approve a non existent review', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    await expect(
      approveReview.execute({
        manager_id: manager.id,
        review_id: 'non-existent-review-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to approve a non not_resolved review', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    const part = await partsRepository.create({
      provider_id: 'provider_id',
      code: '123456',
      description: 'Description'
    })

    const review = await reviewsRepository.create({
      manager_id: manager.id,
      part_id: part.id
    })

    await approveReview.execute({
      manager_id: manager.id,
      review_id: review.id
    })

    await expect(
      approveReview.execute({
        manager_id: manager.id,
        review_id: review.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
