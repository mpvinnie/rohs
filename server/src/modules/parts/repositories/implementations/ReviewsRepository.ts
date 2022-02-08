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

  async findOneByManagerId(
    manager_id: string,
    part_id: string
  ): Promise<Review | null> {
    const review = await prisma.review.findFirst({
      where: {
        manager_id,
        part_id
      }
    })

    return review
  }

  async update({ id, comment, resolve }: Review): Promise<Review> {
    const updatedReview = await prisma.review.update({
      where: { id },
      data: {
        id,
        comment,
        resolve
      }
    })

    return updatedReview
  }
}
