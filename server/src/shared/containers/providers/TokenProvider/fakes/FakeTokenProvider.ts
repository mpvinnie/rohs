import { ITokenProvider } from '../interfaces/ITokenProvider'

export class FakeTokenProvider implements ITokenProvider {
  generate(id: string, _secret: string): string {
    return JSON.stringify({
      sub: id
    })
  }

  verify(token: string, _secret: string): string {
    const { sub: id } = JSON.parse(token)

    return id as string
  }
}
