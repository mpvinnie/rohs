import { inject, injectable } from 'tsyringe'

import { ISendPartForReviewDTO } from '@modules/parts/dtos/PartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { ISubpartsRepository } from '@modules/parts/repositories/interfaces/ISubpartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class SendPartForReviewUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository,
    @inject('SubpartsRepository')
    private subpartsRepository: ISubpartsRepository
  ) {}

  async exucute({ provider_id, part_id }: ISendPartForReviewDTO) {
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

    if (part.status !== 'NOT_SENT' && part.status !== 'DISAPPROVED') {
      throw new AppError(
        `This part cannot be sent for review because its status is ${part.status}`
      )
    }

    const subparts = await this.subpartsRepository.findAllByPartId(part_id)

    if (subparts.length === 0) {
      throw new AppError('You cannot send for review a part without subparts')
    }

    part.status = 'SENT_FOR_REVIEW'

    const sentForReview = await this.partsRepository.update(part)

    return sentForReview
  }
}
