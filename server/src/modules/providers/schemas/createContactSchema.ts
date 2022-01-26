import joi from 'joi'

import { ICreateContactDTO } from '../dtos/ICreateContactDTO'

export const createContactSchema = joi.object<ICreateContactDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  department: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone_number: joi
    .string()
    .length(11)
    .required()
    .regex(/^\d+$/)
    .message('"phone_number" must only have digits'),
  position: joi.string().required()
})
