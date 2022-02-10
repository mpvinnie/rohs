import { ICreateReviewDTO } from '@modules/reviews/dtos/ReviewsDTO'
import { Review } from '@prisma/client'

export interface IReviewsRepository {
  create(data: ICreateReviewDTO): Promise<Review>
  findOneByManagerId(
    manager_id: string,
    review_id: string
  ): Promise<Review | null | undefined>
  findAllByManagerId(manager_id: string): Promise<Review[]>
  update(review: Review): Promise<Review>
}
