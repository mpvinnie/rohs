import { inject, injectable } from 'tsyringe'

import { IManagersRepository } from '@modules/managers/repositories/interfaces/IManagersRepository'
import { IHashProvider } from '@shared/containers/providers/HashProvider/interfaces/IHashProvider'
import { ITokenProvider } from '@shared/containers/providers/TokenProvider/interfaces/ITokenProvider'
import { AppError } from '@shared/errors/AppError'
import { exclude } from '@utils/exclude'

export interface IRequest {
  email: string
  password: string
}

@injectable()
export class AuthenticateManagerUseCase {
  constructor(
    @inject('ManagersRepository')
    private managersRepository: IManagersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  async execute({ email, password }: IRequest) {
    const manager = await this.managersRepository.findByEmail(email)

    if (!manager) {
      throw new AppError('Email or Password incorrect!', 401)
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      manager.password
    )

    if (!passwordMatch) {
      throw new AppError('Email or Password incorrect!', 401)
    }

    const token = this.tokenProvider.generate(manager.id)

    const secureManager = exclude(manager, 'password')

    return {
      manager: secureManager,
      token
    }
  }
}
