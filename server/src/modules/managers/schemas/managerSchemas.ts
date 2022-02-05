import joi from 'joi'

import { IAuthenticateManagerDTO, ICreateManagerDTO } from '../dtos/ManagersDTO'

export const createManagerSchema = joi.object<ICreateManagerDTO>({
  email: joi.string().email().required()
})

export const authenticateManagerSchema = joi.object<IAuthenticateManagerDTO>({
  email: joi.string().email().required(),
  password: joi.string().required()
})
