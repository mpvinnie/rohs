import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IListProvidersDTO } from '@modules/managers/dtos/ProvidersDTO'
import { listProvidersSchema } from '@modules/managers/schemas/providerSchemas'
import { serializeModels } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { ListProvidersUseCase } from './ListProvidersUseCase'

export class ListProvidersController {
  async handle(request: Request, response: Response) {
    const { manager_id } = request

    validateParams<IListProvidersDTO>({ manager_id }, listProvidersSchema)

    const listProviders = container.resolve(ListProvidersUseCase)

    const providers = await listProviders.execute({
      manager_id
    })

    const serializedProviders = serializeModels(providers, 'provider')

    return response.json(serializedProviders)
  }
}
