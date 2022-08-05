import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IListProviderPartsDTO } from '@modules/parts/dtos/PartsDTO'
import { listProviderPartsSchema } from '@modules/parts/schemas/partSchemas'
import validateParams from '@utils/validateParams'

import { ListProviderPartsUseCase } from './ListProviderPartsUseCase'

export class ListProviderPartsController {
  async handle(request: Request, response: Response) {
    const { provider_id } = request

    validateParams<IListProviderPartsDTO>(
      { provider_id },
      listProviderPartsSchema
    )

    const listProviderParts = container.resolve(ListProviderPartsUseCase)

    const parts = await listProviderParts.execute({
      provider_id
    })

    return response.json(parts)
  }
}
