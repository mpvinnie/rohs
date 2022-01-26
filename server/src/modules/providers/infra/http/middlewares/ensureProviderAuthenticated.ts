import { NextFunction, Request, Response } from 'express'

import { jwt } from '@config/auth'
import { JsonwebtokenProvider } from '@shared/containers/providers/TokenProvider/implementations/JsonwebtokenProvider'
import { AppError } from '@shared/errors/AppError'

export async function ensureProviderAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  const { provider_auth_secret } = jwt

  const tokenProvider = new JsonwebtokenProvider()

  try {
    const id = tokenProvider.verify(token, provider_auth_secret)

    request.provider_id = id

    return next()
  } catch (err) {
    throw new AppError('Invalid token!', 401)
  }
}
