import { IHashProvider } from '../interfaces/IHashProvider'

export class FakeHashProvider implements IHashProvider {
  async generateHash(password: string): Promise<string> {
    return password
  }

  async compareHash(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return password === hashedPassword
  }
}
