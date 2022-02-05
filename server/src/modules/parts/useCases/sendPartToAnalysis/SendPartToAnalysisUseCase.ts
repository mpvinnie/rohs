import { inject, injectable } from 'tsyringe'

import { ISendPartToAnalysisDTO } from '@modules/parts/dtos/PartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { ISubpartsRepository } from '@modules/parts/repositories/interfaces/ISubpartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class SendPartToAnalysisUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository,
    @inject('SubpartsRepository')
    private subpartsRepository: ISubpartsRepository
  ) {}

  async exucute({ provider_id, part_id }: ISendPartToAnalysisDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const part = await this.partsRepository.findByProviderId(
      provider_id,
      part_id
    )

    if (!part) {
      throw new AppError('No part found for this provider and part id', 404)
    }

    if (part.status !== 'NOT_SENT') {
      throw new AppError(
        `This part cannot be sent to analysis because its status is ${part.status}`
      )
    }

    const subparts = await this.subpartsRepository.findAllByPartId(part_id)

    if (subparts.length === 0) {
      throw new AppError('You cannot send to analysis a part without subparts')
    }

    part.is_blocked = true
    part.status = 'UNDER_ANALYSIS'

    const sentToAnalysis = await this.partsRepository.update(part)

    return sentToAnalysis
  }
}
