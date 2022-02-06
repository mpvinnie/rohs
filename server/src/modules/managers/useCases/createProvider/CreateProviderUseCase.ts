import { inject, injectable } from 'tsyringe'

import { ICreateProviderDTO } from '@modules/managers/dtos/ProvidersDTO'
import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { IHashProvider } from '@shared/containers/providers/HashProvider/interfaces/IHashProvider'
import { IPasswordProvider } from '@shared/containers/providers/PasswordProvider/interfaces/IPasswordProvider'
import { AppError } from '@shared/errors/AppError'
import generateId from '@utils/generateId'

@injectable()
export class CreateProviderUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('PasswordProvider')
    private passwordProvider: IPasswordProvider,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ manager_id, name, cnpj, segment }: ICreateProviderDTO) {
    const manager = await this.managersRepository.findById(manager_id)

    if (!manager) {
      throw new AppError('No manager found for this id', 404)
    }

    const providerCnpjExists = await this.providersRepository.findByCnpj(cnpj)

    if (providerCnpjExists) {
      throw new AppError('This provider is already registered with this cnpj')
    }

    const id = generateId()

    const providerIdExists = await this.providersRepository.findById(id)

    if (providerIdExists) {
      throw new AppError('Generated id is already in use, try run again')
    }

    const password = this.passwordProvider.generate()

    const hashedPassword = await this.hashProvider.generateHash(password)

    const provider = await this.providersRepository.create({
      id,
      password: hashedPassword,
      name,
      cnpj,
      segment
    })

    return {
      ...provider,
      password
    }
  }
}
