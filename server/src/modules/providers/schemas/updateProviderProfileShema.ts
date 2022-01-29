import joi from 'joi'

import { IUpdateProviderProfileDTO } from '../dtos/IUpdateProviderProfileDTO'

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
    segment: joi.string().required(),
    old_password: joi.string(),
    password: joi.string()
  })
  .with('password', 'old_password')
