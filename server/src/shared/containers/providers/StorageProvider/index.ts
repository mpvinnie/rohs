import { container } from 'tsyringe'

import { DiskStorageProvider } from './implementations/DiskStorageProvider'
import { IStorageProvider } from './interfaces/IStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider
)
