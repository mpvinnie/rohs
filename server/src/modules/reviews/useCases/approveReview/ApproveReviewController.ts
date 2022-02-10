import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IApproveReviewDTO } from '@modules/reviews/dtos/ReviewsDTO'
import { approveReviewSchema } from '@modules/reviews/schemas/reviewSchemas'
import validateParams from '@utils/validateParams'

import { ApproveReviewUseCase } from './ApproveReviewUseCase'

export class ApproveReviewController {
  async handle(request: Request, response: Response) {
    const { id: review_id } = request.params
    const { comment } = request.body

    const { manager_id } = request

    validateParams<IApproveReviewDTO>(
      { manager_id, review_id, comment },
      approveReviewSchema
    )

    const approveReview = container.resolve(ApproveReviewUseCase)

    const approvedReview = await approveReview.execute({
      manager_id,
      review_id,
      comment
    })

    return response.json(approvedReview)
  }
}
