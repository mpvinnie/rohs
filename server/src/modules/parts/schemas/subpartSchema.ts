import joi from 'joi'

import { ICreateSubpartDTO } from '../dtos/SubpartsDTO'

export const createSubpartSchema = joi.object<ICreateSubpartDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  part_id: joi.string().uuid().required(),
  name: joi.string().required(),
  gwi_11a1: joi.string().required(),
  fisp_msds: joi.string().required(),
  rohs_report: joi.string().required(),
  subgroup: joi.string().required()
})
