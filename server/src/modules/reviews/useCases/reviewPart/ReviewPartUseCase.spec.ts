import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakeNotificationsRepository } from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import { FakePartsRepository } from '@modules/parts/repositories/fakes/FakePartsRepository'
import { FakeReviewsRepository } from '@modules/reviews/repositories/fakes/FakeReviewsRepository'
import { AppError } from '@shared/errors/AppError'

import { ReviewPartUseCase } from './ReviewPartUseCase'

let managersRepository: FakeManagersRepository
let partsRepository: FakePartsRepository
let reviewsRepository: FakeReviewsRepository
let notificationsRepository: FakeNotificationsRepository
let reviewPart: ReviewPartUseCase

describe('ReviewPart', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    partsRepository = new FakePartsRepository()
    notificationsRepository = new FakeNotificationsRepository()
    reviewsRepository = new FakeReviewsRepository()

    reviewPart = new ReviewPartUseCase(
      managersRepository,
      partsRepository,
      reviewsRepository,
      notificationsRepository
    )
  })

  it('should be able to review a part and send a notification to its owner', async () => {
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

    const notifications = await notificationsRepository.findByRecipientId(
      'provider_id'
    )

    expect(partForReview).toHaveProperty('id')
    expect(partForReview.part_id).toBe(partSentForReview.id)
    expect(partForReview.part.status).toBe('UNDER_REVIEW')
    expect(notifications.length).toBe(1)
    expect(notifications[0].recipient_id).toBe(part.provider_id)
    expect(notifications[0].is_read).toBe(false)
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
