import joi from 'joi'

import {
  IAuthenticateManagerDTO,
  ICreateManagerDTO,
  IListPartsSentForReviewDTO
} from '../dtos/ManagersDTO'

export const createManagerSchema = joi.object<ICreateManagerDTO>({
  email: joi.string().email().required()
})

export const authenticateManagerSchema = joi.object<IAuthenticateManagerDTO>({
  email: joi.string().email().required(),
  password: joi.string().required()
})

export const listPartsSentForReviewSchema =
  joi.object<IListPartsSentForReviewDTO>({
    manager_id: joi.string().uuid().required()
  })
