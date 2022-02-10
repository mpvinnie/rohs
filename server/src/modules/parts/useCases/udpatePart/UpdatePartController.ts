import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IUpdatePartDTO } from '@modules/parts/dtos/PartsDTO'
import { updatePartSchema } from '@modules/parts/schemas/partSchemas'
import validateParams from '@utils/validateParams'

import { UpdatePartUseCase } from './UpdatePartUseCase'

export class UpdatePartController {
  async handle(request: Request, response: Response) {
    const { id: part_id } = request.params
    const { description, comment } = request.body

    const { provider_id } = request

    validateParams<IUpdatePartDTO>(
      { provider_id, part_id, description, comment },
      updatePartSchema
    )

    const updatePart = container.resolve(UpdatePartUseCase)

    const part = await updatePart.execute({
      provider_id,
      part_id,
      description,
      comment
    })

    return response.json(part)
  }
}
