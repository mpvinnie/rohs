import joi from 'joi'

import {
  IApproveReviewDTO,
  ICreateReviewDTO,
  IDisapproveReview,
  IListManagerReviews
} from '../dtos/ReviewsDTO'

export const createReviewSchema = joi.object<ICreateReviewDTO>({
  manager_id: joi.string().uuid().required(),
  part_id: joi.string().uuid().required()
})

export const listManagerReviewsSchema = joi.object<IListManagerReviews>({
  manager_id: joi.string().uuid().required()
})

export const approveReviewSchema = joi.object<IApproveReviewDTO>({
  manager_id: joi.string().uuid().required(),
  review_id: joi.string().uuid().required(),
  comment: joi.string()
})

export const disapproveReviewSchema = joi.object<IDisapproveReview>({
  manager_id: joi.string().uuid().required(),
  review_id: joi.string().uuid().required(),
  comment: joi.string().required()
})
