import { inject, injectable } from 'tsyringe'

import { IApprovePartDTO } from '@modules/managers/dtos/PartsDTO'
import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { IPartsRepository } from '@modules/parts/repositories/interfaces/IPartsRepository'
import { ISubpartsRepository } from '@modules/parts/repositories/interfaces/ISubpartsRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ApprovePartUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('PartsRepository')
    private partsRepository: IPartsRepository,
    @inject('SubpartsRepository')
    private subpartsRepository: ISubpartsRepository
  ) {}

  async execute({ manager_id, part_id }: IApprovePartDTO) {
    const manager = await this.managersRepository.findById(manager_id)

    if (!manager) {
      throw new AppError('No manager found for this id', 404)
    }

    const part = await this.partsRepository.findById(part_id)

    if (!part) {
      throw new AppError('No part found for this id', 404)
    }

    if (part.status !== 'UNDER_ANALYSIS') {
      throw new AppError('This part is not under analysis')
    }

    const subparts = await this.subpartsRepository.findAllByPartId(part_id)

    if (subparts.length === 0) {
      throw new AppError('You cannot approve a part without subparts')
    }

    part.status = 'APPROVED'

    const approvedPart = await this.partsRepository.update(part)

    return approvedPart
  }
}
