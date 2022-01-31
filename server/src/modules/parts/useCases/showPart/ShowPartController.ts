import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IShowPartDTO } from '@modules/parts/dtos/PartsDTO'
import { showPartSchema } from '@modules/parts/schemas/partSchemas'
import { serializeModel } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { ShowPartUseCase } from './ShowPartUseCase'

export class ShowPartController {
  async handle(request: Request, response: Response) {
    const { id: part_id } = request.params

    const { provider_id } = request

    validateParams<IShowPartDTO>({ provider_id, part_id }, showPartSchema)

    const showPart = container.resolve(ShowPartUseCase)

    const part = await showPart.execute({
      provider_id,
      part_id
    })

    const serializedPart = serializeModel(part, 'part')

    return response.json(serializedPart)
  }
}
