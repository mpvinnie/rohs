import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IListManagerReviews } from '@modules/reviews/dtos/ReviewsDTO'
import { listManagerReviewsSchema } from '@modules/reviews/schemas/reviewSchemas'
import validateParams from '@utils/validateParams'

import { ListManagerReviewsUseCase } from './ListManagerReviewsUseCase'

export class ListManagerReviewsController {
  async handle(request: Request, response: Response) {
    const { manager_id } = request

    validateParams<IListManagerReviews>(
      { manager_id },
      listManagerReviewsSchema
    )

    const listManagerReviews = container.resolve(ListManagerReviewsUseCase)

    const reviews = await listManagerReviews.execute({
      manager_id
    })

    return response.json(reviews)
  }
}
