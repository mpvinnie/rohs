import { inject, injectable } from 'tsyringe'

import { IShowPartDTO } from '@modules/parts/dtos/PartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ShowPartUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository
  ) {}

  async execute({ provider_id, part_id }: IShowPartDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const part = await this.partsRepository.findByProviderId(
      provider_id,
      part_id
    )

    if (!part) {
      throw new AppError('No part found for this id', 404)
    }

    return part
  }
}
