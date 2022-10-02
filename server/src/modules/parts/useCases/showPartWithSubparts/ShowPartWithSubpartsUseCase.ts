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

  async execute({
    provider_id,
    part_id,
    page,
    per_page
  }: IShowPartWithSubpartsDTO) {
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

    const _count = subparts.length

    if (page && per_page) {
      const skip = (page - 1) * per_page
      const take = page * per_page

      const paginatedSubparts = subparts.slice(skip, take)
      return {
        ...part,
        subparts: paginatedSubparts,
        _count_subparts: _count
      }
    }

    return {
      ...part,
      subparts,
      _count_subparts: _count
    }
  }
}
