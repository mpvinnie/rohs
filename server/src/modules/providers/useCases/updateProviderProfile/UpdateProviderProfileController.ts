import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IUpdateProviderProfileDTO } from '@modules/providers/dtos/ProvidersDTO'
import { updateProviderProfileSchema } from '@modules/providers/schemas/providerSchemas'
import { serializeModel } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { UpdateProviderProfileUseCase } from './UpdateProviderProfileUseCase'

export class UpdateProviderProfileController {
  async handle(request: Request, response: Response) {
    const { name, cnpj, old_password, password } = request.body

    const { provider_id } = request

    validateParams<IUpdateProviderProfileDTO>(
      {
        provider_id,
        name,
        cnpj,
        old_password,
        password
      },
      updateProviderProfileSchema
    )

    const updateProviderProfile = container.resolve(
      UpdateProviderProfileUseCase
    )

    const updatedProvider = await updateProviderProfile.execute({
      provider_id,
      cnpj,
      name,
      old_password,
      password
    })

    const serializedProvider = serializeModel(updatedProvider, 'provider')

    return response.json(serializedProvider)
  }
}
