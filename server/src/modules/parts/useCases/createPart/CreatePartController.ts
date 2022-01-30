import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ICreatePartDTO } from '@modules/parts/dtos/PartsDTO'
import { createPartSchema } from '@modules/parts/schemas/partSchemas'
import validateParams from '@utils/validateParams'

import { CreatePartUseCase } from './CreatePartUseCase'

export class CreatePartController {
  async handle(request: Request, response: Response) {
    const { code, description, comment } = request.body

    const { provider_id } = request

    validateParams<ICreatePartDTO>(
      { provider_id, code, description, comment },
      createPartSchema
    )

    const createPart = container.resolve(CreatePartUseCase)

    const part = await createPart.execute({
      provider_id,
      code,
      description,
      comment
    })

    return response.status(201).json(part)
  }
}
