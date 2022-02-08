import { Router } from 'express'

import { ensureManagerAuthenticated } from '@modules/managers/infra/http/middlewares/ensureManagerAuthenticated'
import { ApproveReviewController } from '@modules/reviews/useCases/approveReview/ApproveReviewController'
import { ListManagerReviewsController } from '@modules/reviews/useCases/listManagerReviews/ListManagerReviewsController'
import { ReviewPartController } from '@modules/reviews/useCases/reviewPart/ReviewPartController'

export const reviewsRoutes = Router()

reviewsRoutes.use(ensureManagerAuthenticated)

reviewsRoutes.get('/', new ListManagerReviewsController().handle)
reviewsRoutes.post('/:part_id/review', new ReviewPartController().handle)
reviewsRoutes.patch('/:part_id/approve', new ApproveReviewController().handle)
