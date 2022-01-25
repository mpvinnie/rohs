import { ITokenProvider } from '../interfaces/ITokenProvider'

export class FakeTokenProvider implements ITokenProvider {
  generate(id: string): string {
    return JSON.stringify({
      sub: id
    })
  }
}
