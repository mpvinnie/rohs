import { container } from 'tsyringe'

import { GeneratePasswordProvider } from './implementations/GeneratePassowordProvider'
import { IPasswordProvider } from './interfaces/IPasswordProvider'

container.registerSingleton<IPasswordProvider>(
  'PasswordProvider',
  GeneratePasswordProvider
)
