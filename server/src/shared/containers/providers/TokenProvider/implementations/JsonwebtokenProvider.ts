import { sign } from 'jsonwebtoken'

import { jwt } from '@config/auth'

import { ITokenProvider } from '../interfaces/ITokenProvider'

export class JsonwebtokenProvider implements ITokenProvider {
  generate(id: string): string {
    const token = sign({}, jwt.manager_auth_secret, {
      subject: id,
      expiresIn: jwt.expiresIn
    })

    return token
  }
}
