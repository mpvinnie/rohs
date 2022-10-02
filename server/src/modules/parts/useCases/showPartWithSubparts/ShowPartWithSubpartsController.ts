import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IShowPartWithSubpartsDTO } from '@modules/parts/dtos/PartsDTO'
import { showPartWithSubpartsSchema } from '@modules/parts/schemas/partSchemas'
import { serializeModel } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { ShowPartWithSubpartsUseCase } from './ShowPartWithSubpartsUseCase'

interface IParams {
  page?: number
  per_page?: number
}

export class ShowPartWithSubpartsController {
  async handle(request: Request, response: Response) {
    const { id: part_id } = request.params
    const { page, per_page } = request.query as IParams

    const { provider_id } = request

    validateParams<IShowPartWithSubpartsDTO>(
      { provider_id, part_id, page, per_page },
      showPartWithSubpartsSchema
    )

    const showPartWithSubparts = container.resolve(ShowPartWithSubpartsUseCase)

    const partWithSubparts = await showPartWithSubparts.execute({
      provider_id,
      part_id,
      page,
      per_page
    })

    const serializedPart = serializeModel(partWithSubparts, 'partWithSubpart')

    return response.json(serializedPart)
  }
}
