import joi from 'joi'

import {
  IAuthenticateProviderDTO,
  IUpdateProviderAvatarDTO
} from '../dtos/ProvidersDTO'

export const authenticateProviderSchema = joi.object<IAuthenticateProviderDTO>({
  id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"id" must only have digits'),
  password: joi.string().required()
})

export const updateProviderAvatarSchema = joi.object<IUpdateProviderAvatarDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  avatar_filename: joi.string().required()
})
