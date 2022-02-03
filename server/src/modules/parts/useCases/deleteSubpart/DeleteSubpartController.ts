import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IDeleteSubpartDTO } from '@modules/parts/dtos/SubpartsDTO'
import { deleteSubpartSchema } from '@modules/parts/schemas/subpartSchema'
import validateParams from '@utils/validateParams'

import { DeleteSubpartUseCase } from './DeleteSubpartUseCase'

export class DeleteSubpartController {
  async handle(request: Request, response: Response) {
    const { part_id, id: subpart_id } = request.params

    const { provider_id } = request

    validateParams<IDeleteSubpartDTO>(
      { provider_id, part_id, subpart_id },
      deleteSubpartSchema
    )

    const deleteSubpart = container.resolve(DeleteSubpartUseCase)

    await deleteSubpart.execute({
      provider_id,
      part_id,
      subpart_id
    })

    return response.send()
  }
}
