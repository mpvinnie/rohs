import { container } from 'tsyringe'

import { JsonwebtokenProvider } from './implementations/JsonwebtokenProvider'
import { ITokenProvider } from './interfaces/ITokenProvider'

container.registerSingleton<ITokenProvider>(
  'TokenProvider',
  JsonwebtokenProvider
)
