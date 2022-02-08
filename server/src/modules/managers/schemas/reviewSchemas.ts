import joi from 'joi'

import { ICreateReviewDTO } from '../dtos/ReviewsDTO'

export const createReviewSchema = joi.object<ICreateReviewDTO>({
  manager_id: joi.string().uuid().required(),
  part_id: joi.string().uuid().required()
})
