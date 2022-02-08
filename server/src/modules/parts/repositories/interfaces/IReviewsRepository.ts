import { ICreateReviewDTO } from '@modules/managers/dtos/ReviewsDTO'
import { Review } from '@prisma/client'

export interface IReviewsRepository {
  create(data: ICreateReviewDTO): Promise<Review>
}
