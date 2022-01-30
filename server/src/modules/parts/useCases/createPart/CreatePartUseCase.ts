import { inject, injectable } from 'tsyringe'

import { ICreatePartDTO } from '@modules/parts/dtos/PartsDTO'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class CreatePartUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository
  ) {}

  async execute({ provider_id, code, description, comment }: ICreatePartDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const findPartByCode = await this.partsRepository.findProviderPartByCode(
      provider_id,
      code
    )

    if (findPartByCode) {
      throw new AppError(
        'This part code is already registered for this provider!'
      )
    }

    const part = await this.partsRepository.create({
      provider_id,
      code,
      description,
      comment
    })

    return part
  }
}
