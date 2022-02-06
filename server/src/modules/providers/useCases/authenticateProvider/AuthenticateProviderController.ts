import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IAuthenticateProviderDTO } from '@modules/providers/dtos/ProvidersDTO'
import { authenticateProviderSchema } from '@modules/providers/schemas/providerSchemas'
import { serializeModel } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { AuthenticateProviderUseCase } from './AuthenticateProviderUseCase'

export class AuthenticateProviderController {
  async handle(request: Request, response: Response) {
    const { id, password } = request.body

    validateParams<IAuthenticateProviderDTO>(
      { id, password },
      authenticateProviderSchema
    )

    const authenticateProvider = container.resolve(AuthenticateProviderUseCase)

    const { provider, token } = await authenticateProvider.execute({
      id,
      password
    })

    const serializedProvider = serializeModel(provider, 'provider')

    return response.json({ provider: serializedProvider, token })
  }
}
