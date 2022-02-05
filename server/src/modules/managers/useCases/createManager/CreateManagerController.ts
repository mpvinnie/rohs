import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ICreateManagerDTO } from '@modules/managers/dtos/ManagersDTO'
import { createManagerSchema } from '@modules/managers/schemas/managerSchemas'
import validateParams from '@utils/validateParams'

import { CreateManagerUseCase } from './CreateManagerUseCase'

export class CreateManagerController {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    validateParams<ICreateManagerDTO>({ email }, createManagerSchema)

    const createManager = container.resolve(CreateManagerUseCase)

    const manager = await createManager.execute({
      email
    })

    return response.status(201).json(manager)
  }
}
