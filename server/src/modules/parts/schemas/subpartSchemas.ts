import joi from 'joi'

import { ICreateSubpartDTO, IDeleteSubpartDTO } from '../dtos/SubpartsDTO'

export const createSubpartSchema = joi.object<
  Omit<ICreateSubpartDTO, 'rohs_report_expiration_date'>
>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  part_id: joi.string().uuid().required(),
  name: joi.string().required(),
  gwi4_11a1: joi.string().required(),
  fispq_msds: joi.string().required(),
  rohs_report: joi.string().required(),
  rohs_report_date: joi.date().required(),
  material_type: joi.string().valid('METAL', 'PLASTIC', 'PAPER', 'TAPE')
})

export const deleteSubpartSchema = joi.object<IDeleteSubpartDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  part_id: joi.string().uuid().required(),
  subpart_id: joi.string().uuid().required()
})
