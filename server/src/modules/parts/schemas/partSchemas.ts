import joi from 'joi'

import {
  ICreatePartDTO,
  IListProviderPartsDTO,
  ISendPartForReviewDTO,
  IShowPartWithSubpartsDTO
} from '../dtos/PartsDTO'

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

export const sendPartForReviewSchema = joi.object<ISendPartForReviewDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  part_id: joi.string().uuid().required()
})

export const showPartWithSubpartsSchema = joi.object<IShowPartWithSubpartsDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  part_id: joi.string().uuid().required()
})
