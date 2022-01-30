import joi from 'joi'

import { ICreatePartDTO, IListProviderPartsDTO } from '../dtos/PartsDTO'

export const createPartSchema = joi.object<ICreatePartDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  code: joi.string().required(),
  description: joi.string().required(),
  comment: joi.string()
})

export const listProviderPartsSchema = joi.object<IListProviderPartsDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits')
})
