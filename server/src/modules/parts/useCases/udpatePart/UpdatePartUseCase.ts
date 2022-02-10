import { inject, injectable } from 'tsyringe'

import { IUpdatePartDTO } from '@modules/parts/dtos/PartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class UpdatePartUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository
  ) {}

  async execute({
    provider_id,
    part_id,
    description,
    comment
  }: IUpdatePartDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found with this id', 404)
    }

    const part = await this.partsRepository.findByProviderId(
      provider_id,
      part_id
    )

    if (!part) {
      throw new AppError('No part found for this id')
    }

    if (part.status !== 'NOT_SENT' && part.status !== 'DISAPPROVED') {
      throw new AppError(
        'This part cannot be updated because its status is not `not_sent` and not `disapproved`'
      )
    }

    part.description = description
    part.comment = comment || null

    const updatedPart = await this.partsRepository.update(part)

    return updatedPart
  }
}
