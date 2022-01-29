import { inject, injectable } from 'tsyringe'

import { IListProvidersDTO } from '@modules/managers/dtos/IListProvidersDTO'
import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ListProvidersUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository
  ) {}

  async execute({ manager_id }: IListProvidersDTO) {
    const manager = await this.managersRepository.findById(manager_id)

    if (!manager) {
      throw new AppError('No manager found for this id', 404)
    }

    const providers = await this.providersRepository.find()

    return providers
  }
}
