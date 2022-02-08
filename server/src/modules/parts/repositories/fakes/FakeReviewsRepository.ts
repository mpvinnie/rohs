import { v4 as uuid } from 'uuid'

import { ICreateReviewDTO } from '@modules/managers/dtos/ReviewsDTO'
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
}
