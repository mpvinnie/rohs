import { generate } from 'generate-password'

import { IPasswordProvider } from '../interfaces/IPasswordProvider'

export class GeneratePasswordProvider implements IPasswordProvider {
  generate(): string {
    const password = generate({
      length: 8,
      numbers: true,
      strict: true
    })

    return password
  }
}
