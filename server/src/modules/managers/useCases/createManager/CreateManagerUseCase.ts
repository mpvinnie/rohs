import { inject, injectable } from 'tsyringe'

import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { IHashProvider } from '@shared/containers/providers/HashProvider/interfaces/IHashProvider'
import { IPasswordProvider } from '@shared/containers/providers/PasswordProvider/interfaces/IPasswordProvider'
import { AppError } from '@shared/errors/AppError'

export interface IRequest {
  email: string
}

@injectable()
export class CreateManagerUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('PasswordProvider')
    private passwordProvider: IPasswordProvider,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ email }: IRequest) {
    const managerExists = await this.managersRepository.findByEmail(email)

    if (managerExists) {
      throw new AppError('This manager is already registered')
    }

    const password = this.passwordProvider.generate()

    const hashedPassword = await this.hashProvider.generateHash(password)

    const manager = await this.managersRepository.create({
      email,
      password: hashedPassword
    })

    return {
      id: manager.id,
      email: manager.email,
      password,
      created_at: manager.created_at
    }
  }
}
