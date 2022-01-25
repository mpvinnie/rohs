import joi from 'joi'

import { IRequest } from '../useCases/authenticateProvider/AuthenticateProviderUseCase'

export const authenticateProviderSchema = joi.object<IRequest>({
  id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"cnpj" must only have digits'),
  password: joi.string().required()
})
