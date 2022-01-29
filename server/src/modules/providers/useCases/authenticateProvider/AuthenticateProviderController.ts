import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { authenticateProviderSchema } from '@modules/providers/schemas/authenticateProviderSchema'
import { single } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import {
  AuthenticateProviderUseCase,
  IRequest
} from './AuthenticateProviderUseCase'

export class AuthenticateProviderController {
  async handle(request: Request, response: Response) {
    const { id, password } = request.body

    validateParams<IRequest>({ id, password }, authenticateProviderSchema)

    const authenticateProvider = container.resolve(AuthenticateProviderUseCase)

    const { provider, token } = await authenticateProvider.execute({
      id,
      password
    })

    const serializedProvider = single(provider, 'avatar')

    return response.json({ provider: serializedProvider, token })
  }
}
