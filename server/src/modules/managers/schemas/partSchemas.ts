import joi from 'joi'

import { IApprovePartDTO } from '../dtos/PartsDTO'

export const approvePartSchema = joi.object<IApprovePartDTO>({
  manager_id: joi.string().uuid().required(),
  part_id: joi.string().uuid().required()
})
