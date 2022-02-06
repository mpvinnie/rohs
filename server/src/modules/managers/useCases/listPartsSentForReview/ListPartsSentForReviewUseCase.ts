import { inject, injectable } from 'tsyringe'

import { IListPartsSentForReviewDTO } from '@modules/managers/dtos/ManagersDTO'
import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ListPartsSentForReviewUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository
  ) {}

  async execute({ manager_id }: IListPartsSentForReviewDTO) {
    const manager = await this.managersRepository.findById(manager_id)

    if (!manager) {
      throw new AppError('No manager found for this id', 404)
    }

    const partsSentForReview = await this.partsRepository.findAllSentForReview()

    return partsSentForReview
  }
}
