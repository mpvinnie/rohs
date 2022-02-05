import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IAuthenticateManagerDTO } from '@modules/managers/dtos/ManagersDTO'
import { authenticateManagerSchema } from '@modules/managers/schemas/managerSchemas'
import { serializeModel } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { AuthenticateManagerUseCase } from './AuthenticateManagerUseCase'

export class AuthenticateManagerController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body

    validateParams<IAuthenticateManagerDTO>(
      { email, password },
      authenticateManagerSchema
    )

    const authenticateManager = container.resolve(AuthenticateManagerUseCase)

    const { manager, token } = await authenticateManager.execute({
      email,
      password
    })

    const serializedManager = serializeModel(manager, 'manager')

    return response.json({ manager: serializedManager, token })
  }
}
