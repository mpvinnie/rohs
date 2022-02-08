import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ICreateReviewDTO } from '@modules/managers/dtos/ReviewsDTO'
import { createReviewSchema } from '@modules/managers/schemas/reviewSchemas'
import validateParams from '@utils/validateParams'

import { ReviewPartUseCase } from './ReviewPartUseCase'

export class ReviewPartController {
  async handle(request: Request, response: Response) {
    const { part_id } = request.params

    const { manager_id } = request

    validateParams<ICreateReviewDTO>(
      { manager_id, part_id },
      createReviewSchema
    )

    const reviewPart = container.resolve(ReviewPartUseCase)

    const partForReview = await reviewPart.execute({
      manager_id,
      part_id
    })

    return response.status(201).json(partForReview)
  }
}
