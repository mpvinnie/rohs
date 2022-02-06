import { Router } from 'express'

import { ApprovePartController } from '@modules/managers/useCases/approvePart/ApprovePartController'
import { ListPartsSentForReviewController } from '@modules/managers/useCases/listPartsSentForReview/ListPartsSentForReviewController'

import { ensureManagerAuthenticated } from '../middlewares/ensureManagerAuthenticated'

export const managerPartsRoutes = Router()

managerPartsRoutes.use(ensureManagerAuthenticated)

managerPartsRoutes.patch(
  '/:part_id/approve',
  new ApprovePartController().handle
)

managerPartsRoutes.get(
  '/sentForReview',
  new ListPartsSentForReviewController().handle
)
