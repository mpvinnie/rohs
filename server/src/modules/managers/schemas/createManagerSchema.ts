import joi from 'joi'

import { IRequest } from '../useCases/createManager/CreateManagerUseCase'

export const createManagerSchema = joi.object<IRequest>({
  email: joi.string().email().required()
})
