import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IUpdateProviderProfileDTO } from '@modules/providers/dtos/IUpdateProviderProfileDTO'
import { updateProviderProfileSchema } from '@modules/providers/schemas/updateProviderProfileShema'
import { single } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { UpdateProviderProfileUseCase } from './UpdateProviderProfileUseCase'

export class UpdateProviderProfileController {
  async handle(request: Request, response: Response) {
    const { name, cnpj, segment, old_password, password } = request.body

    const { provider_id } = request

    validateParams<IUpdateProviderProfileDTO>(
      {
        provider_id,
        name,
        cnpj,
        segment,
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
      segment,
      old_password,
      password
    })

    const serializedProvider = single(updatedProvider, 'avatar')

    return response.json(serializedProvider)
  }
}
