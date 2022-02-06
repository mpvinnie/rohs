import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IShowPartWithSubpartsDTO } from '@modules/parts/dtos/PartsDTO'
import { showPartWithSubpartsSchema } from '@modules/parts/schemas/partSchemas'
import { serializeModel } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { ShowPartWithSubpartsUseCase } from './ShowPartWithSubpartsUseCase'

export class ShowPartWithSubpartsController {
  async handle(request: Request, response: Response) {
    const { id: part_id } = request.params

    const { provider_id } = request

    validateParams<IShowPartWithSubpartsDTO>(
      { provider_id, part_id },
      showPartWithSubpartsSchema
    )

    const showPartWithSubparts = container.resolve(ShowPartWithSubpartsUseCase)

    const partWithSubparts = await showPartWithSubparts.execute({
      provider_id,
      part_id
    })

    const serializedPart = serializeModel(partWithSubparts, 'partWithSubpart')

    return response.json(serializedPart)
  }
}
