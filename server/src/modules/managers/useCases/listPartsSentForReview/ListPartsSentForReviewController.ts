import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IListPartsSentForReviewDTO } from '@modules/managers/dtos/ManagersDTO'
import { listPartsSentForReviewSchema } from '@modules/managers/schemas/managerSchemas'
import { serializeModels } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { ListPartsSentForReviewUseCase } from './ListPartsSentForReviewUseCase'

export class ListPartsSentForReviewController {
  async handle(request: Request, response: Response) {
    const { manager_id } = request

    validateParams<IListPartsSentForReviewDTO>(
      { manager_id },
      listPartsSentForReviewSchema
    )

    const listPartsSentForReview = container.resolve(
      ListPartsSentForReviewUseCase
    )

    const partsSentForReview = await listPartsSentForReview.execute({
      manager_id
    })

    const serializedPartsSentForReview = serializeModels(
      partsSentForReview,
      'partWithProvider'
    )

    return response.json(serializedPartsSentForReview)
  }
}
