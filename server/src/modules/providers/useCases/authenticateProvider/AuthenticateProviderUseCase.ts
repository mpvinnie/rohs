import { inject, injectable } from 'tsyringe'

import { jwt } from '@config/auth'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { IHashProvider } from '@shared/containers/providers/HashProvider/interfaces/IHashProvider'
import { ITokenProvider } from '@shared/containers/providers/TokenProvider/interfaces/ITokenProvider'
import { AppError } from '@shared/errors/AppError'

export interface IRequest {
  id: string
  password: string
}

@injectable()
export class AuthenticateProviderUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider
  ) {}

  async execute({ id, password }: IRequest) {
    const provider = await this.providersRepository.findById(id)

    if (!provider) {
      throw new AppError('Id or Password incorrect', 401)
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      provider.password
    )

    if (!passwordMatch) {
      throw new AppError('Id or Password incorrect', 401)
    }

    const token = this.tokenProvider.generate(
      provider.id,
      jwt.provider_auth_secret
    )

    return {
      provider,
      token
    }
  }
}
