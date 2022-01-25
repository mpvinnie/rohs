import { IPasswordProvider } from '../interfaces/IPasswordProvider'

export class FakePasswordProvider implements IPasswordProvider {
  generate(): string {
    return 'password'
  }
}
