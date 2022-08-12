import { inject, injectable } from 'tsyringe'

import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { INotificationsRepository } from '@modules/notifications/repositories/interfaces/INotificationsRepository'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { IDisapproveReviewDTO } from '@modules/reviews/dtos/ReviewsDTO'
import { IReviewsRepository } from '@modules/reviews/repositories/interfaces/IReviewsRepository'
import { Part } from '@prisma/client'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class DisapproveReviewUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository,
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}
  async execute({ manager_id, review_id, comment }: IDisapproveReviewDTO) {
    const manager = await this.managersRepository.findById(manager_id)

    if (!manager) {
      throw new AppError('No manager found with this id', 404)
    }

    const review = await this.reviewsRepository.findOneByManagerId(
      manager_id,
      review_id
    )

    if (!review) {
      throw new AppError(
        'No review found for this manager id and review id',
        404
      )
    }

    if (review.resolve !== 'NOT_RESOLVED') {
      throw new AppError(
        `This review cannot be disapproved because its status resolved is ${review.resolve}`
      )
    }

    const part = (await this.partsRepository.findById(review.part_id)) as Part

    part.status = 'DISAPPROVED'

    await this.partsRepository.update(part)

    review.comment = comment
    review.resolve = 'DISAPPROVED'

    const resolvedReview = await this.reviewsRepository.update(review)

    await this.notificationsRepository.create({
      recipient_id: part.provider_id,
      content: `Your part with part code ${part.code} was disapproved`
    })

    return resolvedReview
  }
}
