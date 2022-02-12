import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IDeletePartDTO } from '@modules/parts/dtos/PartsDTO'
import { deletePartSchema } from '@modules/parts/schemas/partSchemas'
import validateParams from '@utils/validateParams'

import { DeletePartUseCase } from './DeletePartUseCase'

export class DeletePartController {
  async handle(request: Request, response: Response) {
    const { id: part_id } = request.params

    const { provider_id } = request

    validateParams<IDeletePartDTO>(
      {
        provider_id,
        part_id
      },
      deletePartSchema
    )

    const deletePart = container.resolve(DeletePartUseCase)

    await deletePart.execute({
      provider_id,
      part_id
    })

    return response.send()
  }
}
