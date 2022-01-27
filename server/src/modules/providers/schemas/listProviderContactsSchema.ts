import joi from 'joi'

import { IRequest } from '../useCases/listProviderContacts/ListProviderContactsUseCase'

export const listProviderContactsSchema = joi.object<IRequest>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits')
})
