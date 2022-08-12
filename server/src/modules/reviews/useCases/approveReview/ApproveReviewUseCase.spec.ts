import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakeNotificationsRepository } from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeReviewsRepository } from '@modules/reviews/repositories/fakes/FakeReviewsRepository'
import { AppError } from '@shared/errors/AppError'

import { ApproveReviewUseCase } from './ApproveReviewUseCase'

let managersRepository: FakeManagersRepository
let partsRepository: FakePartsRepository
let reviewsRepository: FakeReviewsRepository
let notificationsRepository: FakeNotificationsRepository
let approveReview: ApproveReviewUseCase

describe('ApproveReview', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    partsRepository = new FakePartsRepository()
    reviewsRepository = new FakeReviewsRepository()
    notificationsRepository = new FakeNotificationsRepository()

    approveReview = new ApproveReviewUseCase(
      managersRepository,
      partsRepository,
      reviewsRepository,
      notificationsRepository
    )
  })

  it('should be able to approve a review and send a notification to its owner', async () => {
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

    const notifications = await notificationsRepository.findByRecipientId(
      manager.id
    )

    expect(approvedReview.id).toBe(review.id)
    expect(approvedReview.resolve).toBe('APPROVED')
    expect(notifications.length).toBe(1)
    expect(notifications[0].recipient_id).toBe(manager.id)
    expect(notifications[0].is_read).toBe(false)
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
