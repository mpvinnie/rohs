import { Router } from 'express'

import { ApprovePartController } from '@modules/managers/useCases/approvePart/ApprovePartController'

import { ensureManagerAuthenticated } from '../middlewares/ensureManagerAuthenticated'

export const managerPartsRoutes = Router()

managerPartsRoutes.use(ensureManagerAuthenticated)

managerPartsRoutes.patch(
  '/:part_id/approve',
  new ApprovePartController().handle
)
