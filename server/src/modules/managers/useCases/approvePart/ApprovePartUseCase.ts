import { inject, injectable } from 'tsyringe'

import { IApprovePartDTO } from '@modules/managers/dtos/PartsDTO'
import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { IReviewsRepository } from '@modules/parts/repositories/interfaces/IReviewsRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ApprovePartUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository,
    @inject('ReviewsRepository')
    private reviewsRepository: IReviewsRepository
  ) {}

  async execute({ manager_id, part_id, comment }: IApprovePartDTO) {
    const manager = await this.managersRepository.findById(manager_id)

    if (!manager) {
      throw new AppError('No manager found for this id', 404)
    }

    const part = await this.partsRepository.findById(part_id)

    if (!part) {
      throw new AppError('No part found for this id', 404)
    }

    const review = await this.reviewsRepository.findOneByManagerId(
      manager_id,
      part_id
    )

    if (!review) {
      throw new AppError('No review found for this manager and part ids', 404)
    }

    if (review.resolve !== 'NOT_RESOLVED') {
      throw new AppError(
        `This part cannot be approved because its status resolved is ${review.resolve}`
      )
    }

    review.comment = comment || null
    review.resolve = 'APPROVED'

    await this.reviewsRepository.update(review)

    part.status = 'APPROVED'
    part.approval_date = new Date()

    const approvedPart = await this.partsRepository.update(part)

    return {
      id: part.id,
      status: approvedPart.status,
      approval_date: approvedPart.approval_date
    }
  }
}
