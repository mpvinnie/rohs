import joi from 'joi'

import {
  IAuthenticateManagerDTO,
  ICreateManagerDTO,
  IListPartsAvailableForReviewDTO
} from '../dtos/ManagersDTO'

export const createManagerSchema = joi.object<ICreateManagerDTO>({
  email: joi.string().email().required()
})

export const authenticateManagerSchema = joi.object<IAuthenticateManagerDTO>({
  email: joi.string().email().required(),
  password: joi.string().required()
})

export const listPartsAvailableForReviewSchema =
  joi.object<IListPartsAvailableForReviewDTO>({
    manager_id: joi.string().uuid().required()
  })
