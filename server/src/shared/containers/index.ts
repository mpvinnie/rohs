import { container } from 'tsyringe'

import './providers'

import { ManagersRepository } from '@modules/managers/repositories/implementations/ManagersRepository'
import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'

container.registerSingleton<IManagersRepository>(
  'ManagersRepository',
  ManagersRepository
)
