import { ICreateReviewDTO } from '@modules/managers/dtos/ReviewsDTO'
import { Review } from '@prisma/client'

export interface IReviewsRepository {
  create(data: ICreateReviewDTO): Promise<Review>
  findOneByManagerId(
    manager_id: string,
    part_id: string
  ): Promise<Review | null | undefined>
  update(review: Review): Promise<Review>
}
