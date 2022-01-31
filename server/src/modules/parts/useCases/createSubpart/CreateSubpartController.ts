import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ICreateSubpartDTO } from '@modules/parts/dtos/SubpartsDTO'
import { createSubpartSchema } from '@modules/parts/schemas/subpartSchema'
import { serializeModel } from '@utils/serialize'
import validateParams from '@utils/validateParams'

import { CreateSubpartUseCase } from './CreateSubpartUseCase'

type IFiles = {
  gwi_11a1: Express.Multer.File[]
  fisp_msds: Express.Multer.File[]
  rohs_report: Express.Multer.File[]
}

export class CreateSubpartController {
  async handle(request: Request, response: Response) {
    const { name, subgroup } = request.body
    const { provider_id } = request
    const { part_id } = request.params

    const files = request.files as IFiles

    const gwi_11a1 = files.gwi_11a1 ? files.gwi_11a1[0].filename : ''
    const fisp_msds = files.fisp_msds ? files.fisp_msds[0].filename : ''
    const rohs_report = files.rohs_report ? files.rohs_report[0].filename : ''

    validateParams<ICreateSubpartDTO>(
      {
        provider_id,
        part_id,
        name,
        gwi_11a1,
        fisp_msds,
        rohs_report,
        subgroup
      },
      createSubpartSchema
    )

    const createSubpart = container.resolve(CreateSubpartUseCase)

    const subpart = await createSubpart.execute({
      provider_id,
      part_id,
      name,
      gwi_11a1,
      fisp_msds,
      rohs_report,
      subgroup
    })

    const serializedSubpart = serializeModel(subpart, 'subpart')

    return response.status(201).json(serializedSubpart)
  }
}
