import joi from 'joi'

import { IListProvidersDTO } from '../dtos/IListProvidersDTO'

export const listProvidersSchema = joi.object<IListProvidersDTO>({
  manager_id: joi.string().uuid()
})
