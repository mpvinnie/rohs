import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ISendPartToAnalysisDTO } from '@modules/parts/dtos/PartsDTO'
import { sendPartToAnalysisSchema } from '@modules/parts/schemas/partSchemas'
import validateParams from '@utils/validateParams'

import { SendPartToAnalysisUseCase } from './SendPartToAnalysisUseCase'

export class SendPartToAnalysisController {
  async handle(request: Request, response: Response) {
    const { id: part_id } = request.params
    const { provider_id } = request

    validateParams<ISendPartToAnalysisDTO>(
      { provider_id, part_id },
      sendPartToAnalysisSchema
    )

    const sendPartToAnalysis = container.resolve(SendPartToAnalysisUseCase)

    const sentPart = await sendPartToAnalysis.exucute({
      provider_id,
      part_id
    })

    return response.json(sentPart)
  }
}
