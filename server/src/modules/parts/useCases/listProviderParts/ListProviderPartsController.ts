import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IListProviderPartsDTO } from '@modules/parts/dtos/PartsDTO'
import { listProviderPartsSchema } from '@modules/parts/schemas/partSchemas'
import validateParams from '@utils/validateParams'

import { ListProviderPartsUseCase } from './ListProviderPartsUseCase'

interface IParams {
  page?: number
  per_page?: number
}

export class ListProviderPartsController {
  async handle(request: Request, response: Response) {
    const { provider_id } = request
    const { page, per_page } = request.query as IParams

    validateParams<IListProviderPartsDTO>(
      { provider_id, page, per_page },
      listProviderPartsSchema
    )

    const listProviderParts = container.resolve(ListProviderPartsUseCase)

    const parts = await listProviderParts.execute({
      provider_id,
      page,
      per_page
    })

    return response.json(parts)
  }
}
