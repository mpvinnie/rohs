import { Router } from 'express'

import uploadConfig from '@config/upload'
import { UpdateProviderAvatarController } from '@modules/providers/useCases/updateProviderAvatar/UpdateProviderAvatarController'
import { UpdateProviderProfileController } from '@modules/providers/useCases/updateProviderProfile/UpdateProviderProfileController'

import { ensureProviderAuthenticated } from '../middlewares/ensureProviderAuthenticated'

export const profileRoutes = Router()

profileRoutes.use(ensureProviderAuthenticated)

profileRoutes.patch(
  '/avatar',
  uploadConfig.upload.single('avatar'),
  new UpdateProviderAvatarController().handle
)

profileRoutes.put('/', new UpdateProviderProfileController().handle)
