import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ICreateProviderDTO } from '@modules/managers/dtos/ProvidersDTO'
import { createProviderSchema } from '@modules/managers/schemas/providerSchemas'
import validateParams from '@utils/validateParams'

import { CreateProviderUseCase } from './CreateProviderUseCase'

export class CreateProviderController {
  async handle(request: Request, response: Response) {
    const { name, cnpj, segment } = request.body

    const { manager_id } = request

    validateParams<ICreateProviderDTO>(
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
