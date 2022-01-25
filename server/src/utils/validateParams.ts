import Joi from 'joi'

import { AppError } from '@shared/errors/AppError'

export default function validateParams<T>(params: T, schema: Joi.ObjectSchema) {
  const validation = schema.validate(params)

  if (validation.error) {
    throw new AppError(validation.error.details[0].message)
  }
}
