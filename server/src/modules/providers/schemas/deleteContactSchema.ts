import joi from 'joi'

import { IRequest } from '../useCases/deleteContact/DeleteContactUseCase'

export const deleteContactSchema = joi.object<IRequest>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  contact_id: joi.string().uuid().required()
})
