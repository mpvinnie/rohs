import joi from 'joi'

import { IRequest } from '../useCases/updateProviderAvatar/UpdateProviderAvatarUseCase'

export const updateProviderAvatarSchema = joi.object<IRequest>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  avatar_filename: joi.string().required()
})
