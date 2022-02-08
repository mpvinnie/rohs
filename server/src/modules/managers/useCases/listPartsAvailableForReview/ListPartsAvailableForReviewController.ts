import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IListPartsAvailableForReviewDTO } from '@modules/managers/dtos/PartsDTO'
import { listPartsAvailableForReviewSchema } from '@modules/parts/schemas/partSchemas'
import { serializeModels } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { ListPartsAvailableForReviewUseCase } from './ListPartsAvailableForReviewUseCase'

export class ListPartsAvailableForReviewController {
  async handle(request: Request, response: Response) {
    const { manager_id } = request

    validateParams<IListPartsAvailableForReviewDTO>(
      { manager_id },
      listPartsAvailableForReviewSchema
    )

    const listPartsAvailableForReview = container.resolve(
      ListPartsAvailableForReviewUseCase
    )

    const partsAvailableForReview = await listPartsAvailableForReview.execute({
      manager_id
    })

    const serializedPartsAvailableForReview = serializeModels(
      partsAvailableForReview,
      'partWithProvider'
    )

    return response.json(serializedPartsAvailableForReview)
  }
}
