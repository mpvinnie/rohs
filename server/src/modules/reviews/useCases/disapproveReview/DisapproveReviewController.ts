import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IDisapproveReviewDTO } from '@modules/reviews/dtos/ReviewsDTO'
import { disapproveReviewSchema } from '@modules/reviews/schemas/reviewSchemas'
import validateParams from '@utils/validateParams'

import { DisapproveReviewUseCase } from './DisapproveReviewUseCase'

export class DisapproveReviewController {
  async handle(request: Request, response: Response) {
    const { id: review_id } = request.params
    const { comment } = request.body

    const { manager_id } = request

    validateParams<IDisapproveReviewDTO>(
      { manager_id, review_id, comment },
      disapproveReviewSchema
    )

    const disapproveReview = container.resolve(DisapproveReviewUseCase)

    const disapprovedReview = await disapproveReview.execute({
      manager_id,
      review_id,
      comment
    })

    return response.json(disapprovedReview)
  }
}
