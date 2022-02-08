import { FakeManagersRepository } from '@modules/managers/repositories/fakes/FakeManagersRepository'
import { FakeReviewsRepository } from '@modules/reviews/repositories/fakes/FakeReviewsRepository'
import { AppError } from '@shared/errors/AppError'

import { ListManagerReviewsUseCase } from './ListManagerReviewsUseCase'

let managersRepository: FakeManagersRepository
let reviewsRepository: FakeReviewsRepository
let listManagerReviews: ListManagerReviewsUseCase

describe('ListManagerReviews', () => {
  beforeEach(() => {
    managersRepository = new FakeManagersRepository()
    reviewsRepository = new FakeReviewsRepository()

    listManagerReviews = new ListManagerReviewsUseCase(
      managersRepository,
      reviewsRepository
    )
  })

  it('should be able to list all manager reviews', async () => {
    const manager = await managersRepository.create({
      email: 'manager@email.com',
      password: 'password'
    })

    await reviewsRepository.create({
      manager_id: 'another-manager-id',
      part_id: 'another-part-id'
    })

    const review = await reviewsRepository.create({
      manager_id: manager.id,
      part_id: 'part_id_1'
    })

    const managerReviews = await listManagerReviews.execute({
      manager_id: manager.id
    })

    expect(managerReviews.length).toBe(1)
    expect(managerReviews[0]).toBe(review)
  })

  it('should not be able to list all reviews from a non-existent manager', async () => {
    await expect(
      listManagerReviews.execute({
        manager_id: 'non-existent-manager-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
