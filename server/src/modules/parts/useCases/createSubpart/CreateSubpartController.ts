import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { createSubpartSchema } from '@modules/parts/schemas/subpartSchemas'
import { serializeModel } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { CreateSubpartUseCase } from './CreateSubpartUseCase'

type IFiles = {
  gwi4_11a1: Express.Multer.File[]
  fispq_msds: Express.Multer.File[]
  rohs_report: Express.Multer.File[]
}

export class CreateSubpartController {
  async handle(request: Request, response: Response) {
    const { name, material_type, rohs_report_date } = request.body
    const { provider_id } = request
    const { part_id } = request.params

    const files = request.files as IFiles

    const gwi4_11a1 = files.gwi4_11a1 ? files.gwi4_11a1[0].filename : ''
    const fispq_msds = files.fispq_msds ? files.fispq_msds[0].filename : ''
    const rohs_report = files.rohs_report ? files.rohs_report[0].filename : ''

    validateParams(
      {
        provider_id,
        part_id,
        name,
        gwi4_11a1,
        fispq_msds,
        rohs_report,
        rohs_report_date,
        material_type
      },
      createSubpartSchema
    )

    const createSubpart = container.resolve(CreateSubpartUseCase)

    const subpart = await createSubpart.execute({
      provider_id,
      part_id,
      name,
      gwi4_11a1,
      fispq_msds,
      rohs_report,
      rohs_report_date,
      material_type
    })

    const serializedSubpart = serializeModel(subpart, 'subpart')

    return response.status(201).json(serializedSubpart)
  }
}
