import joi from 'joi'

import { IUpdateContactDTO } from '../dtos/IUpdateContactDTO'

export const updateContactSchema = joi.object<IUpdateContactDTO>({
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
  position: joi.string().required(),
  id: joi.string().uuid().required()
})
