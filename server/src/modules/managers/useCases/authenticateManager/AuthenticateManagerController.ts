import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { authenticateManagerSchema } from '@modules/managers/schemas/authenticateManagerSchema'
import { single } from '@utils/serialize'
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

    const serializedManager = single(manager)

    return response.json({ manager: serializedManager, token })
  }
}
