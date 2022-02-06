import joi from 'joi'

import { IUpdateProviderAvatarDTO } from '../dtos/ProvidersDTO'

export const updateProviderAvatarSchema = joi.object<IUpdateProviderAvatarDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  avatar_filename: joi.string().required()
})
