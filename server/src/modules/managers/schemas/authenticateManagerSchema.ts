import joi from 'joi'

import { IRequest } from '../useCases/authenticateManager/AuthenticateManagerUseCase'

export const authenticateManagerSchema = joi.object<IRequest>({
  email: joi.string().email().required(),
  password: joi.string().required()
})
