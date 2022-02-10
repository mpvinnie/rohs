import { Router } from 'express'

import { ensureManagerAuthenticated } from '@modules/managers/infra/http/middlewares/ensureManagerAuthenticated'
import { ApproveReviewController } from '@modules/reviews/useCases/approveReview/ApproveReviewController'
import { DisapproveReviewController } from '@modules/reviews/useCases/disapproveReview/DisapproveReviewController'
import { ListManagerReviewsController } from '@modules/reviews/useCases/listManagerReviews/ListManagerReviewsController'
import { ReviewPartController } from '@modules/reviews/useCases/reviewPart/ReviewPartController'

export const reviewsRoutes = Router()

reviewsRoutes.use(ensureManagerAuthenticated)

reviewsRoutes.get('/', new ListManagerReviewsController().handle)
reviewsRoutes.post('/', new ReviewPartController().handle)
reviewsRoutes.patch('/:id/approve', new ApproveReviewController().handle)
reviewsRoutes.patch('/:id/disapprove', new DisapproveReviewController().handle)
