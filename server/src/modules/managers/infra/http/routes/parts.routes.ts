import { Router } from 'express'

import { ListPartsAvailableForReviewController } from '@modules/managers/useCases/listPartsAvailableForReview/ListPartsAvailableForReviewController'

import { ensureManagerAuthenticated } from '../middlewares/ensureManagerAuthenticated'

export const managerPartsRoutes = Router()

managerPartsRoutes.use(ensureManagerAuthenticated)

managerPartsRoutes.get(
  '/sentForReview',
  new ListPartsAvailableForReviewController().handle
)
