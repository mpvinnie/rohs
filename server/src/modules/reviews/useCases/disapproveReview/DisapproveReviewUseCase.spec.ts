import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeReviewsRepository } from '@modules/reviews/repositories/fakes/FakeReviewsRepository'
import { AppError } from '@shared/errors/AppError'

import { DisapproveReviewUseCase } from './DisapproveReviewUseCase'

let managersRepository: FakeManagersRepository
let partsRepository: FakePartsRepository
let reviewsRepository: FakeReviewsRepository
let disapproveReview: DisapproveReviewUseCase

describe('DisapproveReview', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    partsRepository = new FakePartsRepository()
    reviewsRepository = new FakeReviewsRepository()

    disapproveReview = new DisapproveReviewUseCase(
      managersRepository,
      partsRepository,
      reviewsRepository
    )
  })

  it('should be able to disapprove a review', async () => {
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

    const approvedReview = await disapproveReview.execute({
      manager_id: manager.id,
      review_id: review.id,
      comment: 'Comment'
    })

    expect(approvedReview.id).toBe(review.id)
    expect(approvedReview.resolve).toBe('DISAPPROVED')
  })

  it('should not be able to disapprove a review if manager non exists', async () => {
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
      disapproveReview.execute({
        manager_id: 'non-existent-manager-id',
        review_id: review.id,
        comment: 'Comment'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to disapprove a non existent review', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    await expect(
      disapproveReview.execute({
        manager_id: manager.id,
        review_id: 'non-existent-review-id',
        comment: 'Comment'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to disapprove a non not_resolved review', async () => {
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

    await disapproveReview.execute({
      manager_id: manager.id,
      review_id: review.id,
      comment: 'Comment'
    })

    await expect(
      disapproveReview.execute({
        manager_id: manager.id,
        review_id: review.id,
        comment: 'Comment'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
