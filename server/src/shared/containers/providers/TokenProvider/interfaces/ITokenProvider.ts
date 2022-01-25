export interface ITokenProvider {
  generate(id: string, secret: string): string
  verify(token: string, secret: string): string
}
