import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ISendPartForReviewDTO } from '@modules/parts/dtos/PartsDTO'
import { sendPartForReviewSchema } from '@modules/parts/schemas/partSchemas'
import validateParams from '@utils/validateParams'

import { SendPartForReviewUseCase } from './SendPartForReviewUseCase'

export class SendPartForReviewController {
  async handle(request: Request, response: Response) {
    const { id: part_id } = request.params
    const { provider_id } = request

    validateParams<ISendPartForReviewDTO>(
      { provider_id, part_id },
      sendPartForReviewSchema
    )

    const sendPartForReview = container.resolve(SendPartForReviewUseCase)

    const sentPart = await sendPartForReview.exucute({
      provider_id,
      part_id
    })

    return response.json(sentPart)
  }
}
