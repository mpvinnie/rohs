import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { updateProviderAvatarSchema } from '@modules/providers/schemas/updateProviderAvatarSchema'
import { serializeModel } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import {
  IRequest,
  UpdateProviderAvatarUseCase
} from './UpdateProviderAvatarUseCase'

export class UpdateProviderAvatarController {
  async handle(request: Request, response: Response) {
    const { provider_id } = request

    const avatar_filename = request.file?.filename as string

    validateParams<IRequest>(
      { provider_id, avatar_filename },
      updateProviderAvatarSchema
    )

    const updateProviderAvatar = container.resolve(UpdateProviderAvatarUseCase)

    const provider = await updateProviderAvatar.execute({
      provider_id,
      avatar_filename
    })

    const serializedProvider = serializeModel(provider, 'provider')

    return response.json(serializedProvider)
  }
}
