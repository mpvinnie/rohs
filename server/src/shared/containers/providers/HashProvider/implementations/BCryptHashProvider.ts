import { compare, hash } from 'bcrypt'

import { IHashProvider } from '../interfaces/IHashProvider'

export class BCryptHashProvider implements IHashProvider {
  async generateHash(password: string): Promise<string> {
    return hash(password, 10)
  }

  async compareHash(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return compare(password, hashedPassword)
  }
}
