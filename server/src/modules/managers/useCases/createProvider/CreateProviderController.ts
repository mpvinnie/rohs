import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { createProviderSchema } from '@modules/managers/schemas/createProviderSchema'
import validateParams from '@utils/validateParams'

import { CreateProviderUseCase, IRequest } from './CreateProviderUseCase'

export class CreateProviderController {
  async handle(request: Request, response: Response) {
    const { name, cnpj, segment } = request.body

    const { manager_id } = request

    console.log(manager_id)

    validateParams<IRequest>(
      {
        name,
        cnpj,
        manager_id,
        segment
      },
      createProviderSchema
    )

    const createProvider = container.resolve(CreateProviderUseCase)

    const provider = await createProvider.execute({
      manager_id,
      name,
      cnpj,
      segment
    })

    return response.status(201).json(provider)
  }
}
