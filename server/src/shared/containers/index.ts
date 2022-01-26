import { container } from 'tsyringe'

import './providers'

import { ManagersRepository } from '@modules/managers/repositories/implementations/ManagersRepository'
import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { ContactsRepository } from '@modules/providers/repositories/implementations/ContactsRepository'
import { ProvidersRepository } from '@modules/providers/repositories/implementations/ProvidersRepository'
import { IContactsRepository } from '@modules/providers/repositories/interfaces/IContactsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'

container.registerSingleton<IManagersRepository>(
  'ManagersRepository',
  ManagersRepository
)

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  ProvidersRepository
)

container.registerSingleton<IContactsRepository>(
  'ContactsRepository',
  ContactsRepository
)
