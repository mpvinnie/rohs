import joi from 'joi'

import { ICreateProviderDTO, IListProvidersDTO } from '../dtos/ProvidersDTO'

export const listProvidersSchema = joi.object<IListProvidersDTO>({
  manager_id: joi.string().uuid()
})

export const createProviderSchema = joi.object<ICreateProviderDTO>({
  name: joi.string().required(),
  cnpj: joi
    .string()
    .length(14)
    .required()
    .regex(/^\d+$/)
    .message('"cnpj" must only have digits'),
  manager_id: joi.string().uuid().required(),
  segment: joi.string().required()
})
