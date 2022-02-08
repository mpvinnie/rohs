import { inject, injectable } from 'tsyringe'

import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { ICreateReviewDTO } from '@modules/reviews/dtos/ReviewsDTO'
import { IReviewsRepository } from '@modules/reviews/repositories/interfaces/IReviewsRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ReviewPartUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository,
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository
  ) {}

  async execute({ manager_id, part_id }: ICreateReviewDTO) {
    const manager = await this.managersRepository.findById(manager_id)

    if (!manager) {
      throw new AppError('No provider found for this id', 404)
    }

    const part = await this.partsRepository.findById(part_id)

    if (!part) {
      throw new AppError('No part found for this id', 404)
    }

    if (part.status !== 'SENT_FOR_REVIEW') {
      throw new AppError('This part is not available for review')
    }

    part.status = 'UNDER_REVIEW'

    const partUnderReview = await this.partsRepository.update(part)

    const review = await this.reviewsRepository.create({
      manager_id,
      part_id
    })

    return {
      ...review,
      part: partUnderReview
    }
  }
}
