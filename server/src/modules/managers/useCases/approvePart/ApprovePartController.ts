import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IApprovePartDTO } from '@modules/managers/dtos/PartsDTO'
import { approvePartSchema } from '@modules/managers/schemas/partSchemas'
import validateParams from '@utils/validateParams'

import { ApprovePartUseCase } from './ApprovePartUseCase'

export class ApprovePartController {
  async handle(request: Request, response: Response) {
    const { part_id } = request.params
    const { comment } = request.body

    const { manager_id } = request

    validateParams<IApprovePartDTO>(
      { manager_id, part_id, comment },
      approvePartSchema
    )

    const approvePart = container.resolve(ApprovePartUseCase)

    const approvedPart = await approvePart.execute({
      manager_id,
      part_id,
      comment
    })

    return response.json(approvedPart)
  }
}
