import { inject, injectable } from 'tsyringe'

import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { IListManagerReviews } from '@modules/reviews/dtos/ReviewsDTO'
import { IReviewsRepository } from '@modules/reviews/repositories/interfaces/IReviewsRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ListManagerReviewsUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository
  ) {}

  async execute({ manager_id }: IListManagerReviews) {
    const manager = await this.managersRepository.findById(manager_id)

    if (!manager) {
      throw new AppError('No manager found for this id', 404)
    }

    const reviews = await this.reviewsRepository.findAllByManagerId(manager_id)

    return reviews
  }
}
