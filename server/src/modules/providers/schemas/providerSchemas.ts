import joi from 'joi'

import {
  IAuthenticateProviderDTO,
  IUpdateProviderAvatarDTO,
  IUpdateProviderProfileDTO
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

export const updateProviderProfileSchema = joi
  .object<IUpdateProviderProfileDTO>({
    provider_id: joi
      .string()
      .length(8)
      .required()
      .regex(/^\d+$/)
      .message('"provider_id" must only have digits'),
    name: joi.string().required(),
    cnpj: joi
      .string()
      .length(14)
      .required()
      .regex(/^\d+$/)
      .message('"cnpj" must only have digits'),
    old_password: joi.string(),
    password: joi.string()
  })
  .with('password', 'old_password')
