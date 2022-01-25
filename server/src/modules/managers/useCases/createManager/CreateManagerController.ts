import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { createManagerSchema } from '@modules/managers/schemas/createManagerSchema'
import validateParams from '@utils/validateParams'

import { CreateManagerUseCase, IRequest } from './CreateManagerUseCase'

export class CreateManagerController {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    validateParams<IRequest>({ email }, createManagerSchema)

    const createManager = container.resolve(CreateManagerUseCase)

    const manager = await createManager.execute({
      email
    })

    return response.status(201).json(manager)
  }
}
