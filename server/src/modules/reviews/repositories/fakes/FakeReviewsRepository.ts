import { v4 as uuid } from 'uuid'

import { ICreateReviewDTO } from '@modules/reviews/dtos/ReviewsDTO'
import { Review } from '@prisma/client'

import { IReviewsRepository } from '../interfaces/IReviewsRepository'

export class FakeReviewsRepository implements IReviewsRepository {
  private reviews: Review[] = []

  async create({ manager_id, part_id }: ICreateReviewDTO): Promise<Review> {
    const review: Review = {
      id: uuid(),
      resolve: 'NOT_RESOLVED',
      manager_id,
      part_id,
      comment: null,
      created_at: new Date()
    }

    this.reviews.push(review)

    return review
  }

  async findOneByManagerId(
    manager_id: string,
    part_id: string
  ): Promise<Review | undefined> {
    const review = this.reviews.find(
      review => review.manager_id === manager_id && review.part_id === part_id
    )

    return review
  }

  async findAllByManagerId(manager_id: string): Promise<Review[]> {
    const reviews = this.reviews.filter(
      review => review.manager_id === manager_id
    )

    return reviews
  }

  async update(review: Review): Promise<Review> {
    const findIndex = this.reviews.findIndex(
      findReview => findReview.id === review.id
    )

    this.reviews[findIndex] = review

    return this.reviews[findIndex]
  }
}
