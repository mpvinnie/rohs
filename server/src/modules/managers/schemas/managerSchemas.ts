import joi from 'joi'

import { ICreateManagerDTO } from '../dtos/ManagersDTO'

export const createManagerSchema = joi.object<ICreateManagerDTO>({
  email: joi.string().email().required()
})
