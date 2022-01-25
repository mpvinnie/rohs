import { container } from 'tsyringe'

import './providers'

import { ManagersRepository } from '@modules/managers/repositories/implementations/ManagersRepository'
import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { ProvidersRepository } from '@modules/providers/repositories/implementations/ProvidersRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'

container.registerSingleton<IManagersRepository>(
  'ManagersRepository',
  ManagersRepository
)

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  ProvidersRepository
)
