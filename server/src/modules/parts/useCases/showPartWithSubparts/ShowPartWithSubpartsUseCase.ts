import { inject, injectable } from 'tsyringe'

import { IShowPartWithSubpartsDTO } from '@modules/parts/dtos/PartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { ISubpartsRepository } from '@modules/parts/repositories/interfaces/ISubpartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ShowPartWithSubpartsUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository,
    @inject('SubpartsRepository')
    private subpartsRepository: ISubpartsRepository
  ) {}

  async execute({ provider_id, part_id }: IShowPartWithSubpartsDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const part = await this.partsRepository.findByProviderId(
      provider_id,
      part_id
    )

    if (!part) {
      throw new AppError('No part found with this id', 404)
    }

    const subparts = await this.subpartsRepository.findAllByPartId(part_id)

    return {
      ...part,
      subparts
    }
  }
}
