import { Router } from 'express'

import uploadConfig from '@config/upload'
import { UpdateProviderAvatarController } from '@modules/providers/useCases/updateProviderAvatar/UpdateProviderAvatarController'

import { ensureProviderAuthenticated } from '../middlewares/ensureProviderAuthenticated'

export const profileRoutes = Router()

profileRoutes.patch(
  '/avatar',
  ensureProviderAuthenticated,
  uploadConfig.upload.single('avatar'),
  new UpdateProviderAvatarController().handle
)
