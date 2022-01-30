import { inject, injectable } from 'tsyringe'

import { IListProviderPartsDTO } from '@modules/parts/dtos/PartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ListProviderPartsUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository
  ) {}

  async execute({ provider_id }: IListProviderPartsDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const parts = await this.partsRepository.findByProviderId(provider_id)

    return parts
  }
}
