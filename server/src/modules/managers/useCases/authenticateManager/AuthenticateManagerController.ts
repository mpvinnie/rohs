import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { authenticateManagerSchema } from '@modules/managers/schemas/authenticateManagerSchema'
import validateParams from '@utils/validateParams'

import {
  AuthenticateManagerUseCase,
  IRequest
} from './AuthenticateManagerUseCase'

export class AuthenticateManagerController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    validateParams<IRequest>({ email, password }, authenticateManagerSchema)

    const authenticateManager = container.resolve(AuthenticateManagerUseCase)

    const { manager, token } = await authenticateManager.execute({
      email,
      password
    })

    return response.json({ manager, token })
  }
}
