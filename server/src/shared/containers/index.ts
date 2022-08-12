import { container } from 'tsyringe'

import './providers'

import { ManagersRepository } from '@modules/managers/repositories/implementations/ManagersRepository'
import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { NotificationsRepository } from '@modules/notifications/repositories/implementations/NotificationsRepository'
import { INotificationsRepository } from '@modules/notifications/repositories/interfaces/INotificationsRepository'
import { PartsRepository } from '@modules/parts/repositories/implementations/PartsRepository'
import { SubpartsRepository } from '@modules/parts/repositories/implementations/SubpartsRepository'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { ISubpartsRepository } from '@modules/parts/repositories/interfaces/ISubpartsRepository'
import { ContactsRepository } from '@modules/providers/repositories/implementations/ContactsRepository'
import { ProvidersRepository } from '@modules/providers/repositories/implementations/ProvidersRepository'
import { IContactsRepository } from '@modules/providers/repositories/interfaces/IContactsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { ReviewsRepository } from '@modules/reviews/repositories/implementations/ReviewsRepository'
import { IReviewsRepository } from '@modules/reviews/repositories/interfaces/IReviewsRepository'

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

container.registerSingleton<IPartsRepository>(
  'PartsRepository',
  PartsRepository
)

container.registerSingleton<ISubpartsRepository>(
  'SubpartsRepository',
  SubpartsRepository
)

container.registerSingleton<IReviewsRepository>(
  'ReviewsRepository',
  ReviewsRepository
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
)
