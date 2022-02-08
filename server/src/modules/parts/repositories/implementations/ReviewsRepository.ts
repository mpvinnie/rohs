import { ICreateReviewDTO } from '@modules/managers/dtos/ReviewsDTO'
import { Review } from '@prisma/client'
import { prisma } from '@shared/infra/prisma'

import { IReviewsRepository } from '../interfaces/IReviewsRepository'

export class ReviewsRepository implements IReviewsRepository {
  async create({ manager_id, part_id }: ICreateReviewDTO): Promise<Review> {
    const review = await prisma.review.create({
      data: {
        manager_id,
        part_id
      }
    })

    return review
  }
}
