import joi from 'joi'

import { IRequest } from '../../managers/useCases/createProvider/CreateProviderUseCase'

export const createProviderSchema = joi.object<IRequest>({
  name: joi.string().required(),
  cnpj: joi
    .string()
    .length(14)
    .required()
    .regex(/^\d+$/)
    .message('"cnpj" must only have digits'),
  manager_id: joi.string().uuid().required(),
  segment: joi.string().required()
})
