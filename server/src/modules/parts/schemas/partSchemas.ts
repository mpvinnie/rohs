import joi from 'joi'

import { IListPartsAvailableForReviewDTO } from '@modules/managers/dtos/PartsDTO'

import {
  ICreatePartDTO,
  IDeletePartDTO,
  IListProviderPartsDTO,
  ISendPartForReviewDTO,
  IShowPartWithSubpartsDTO,
  IUpdatePartDTO
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
  comment: joi.string().allow(null, '')
})

export const listProviderPartsSchema = joi
  .object<IListProviderPartsDTO>({
    provider_id: joi
      .string()
      .length(8)
      .required()
      .regex(/^\d+$/)
      .message('"provider_id" must only have digits'),
    page: joi.number(),
    per_page: joi.number()
  })
  .with('page', 'per_page')

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
  part_id: joi.string().uuid().required(),
  page: joi.number(),
  per_page: joi.number()
})

export const listPartsAvailableForReviewSchema =
  joi.object<IListPartsAvailableForReviewDTO>({
    manager_id: joi.string().uuid().required()
  })

export const updatePartSchema = joi.object<IUpdatePartDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  part_id: joi.string().uuid().required(),
  description: joi.string().required(),
  comment: joi.string()
})

export const deletePartSchema = joi.object<IDeletePartDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  part_id: joi.string().uuid().required()
})
