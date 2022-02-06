import { inject, injectable } from 'tsyringe'

import { IUpdateProviderProfileDTO } from '@modules/providers/dtos/ProvidersDTO'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { IHashProvider } from '@shared/containers/providers/HashProvider/interfaces/IHashProvider'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class UpdateProviderProfileUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({
    provider_id,
    name,
    cnpj,
    old_password,
    password
  }: IUpdateProviderProfileDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const providerWithSameCnpj = await this.providersRepository.findByCnpj(cnpj)

    if (providerWithSameCnpj && providerWithSameCnpj.id !== provider_id) {
      throw new AppError('The cnpj provided is already in use')
    }

    if (old_password && password) {
      const passwordsMatched = await this.hashProvider.compareHash(
        old_password,
        provider.password
      )

      if (!passwordsMatched) {
        throw new AppError('Old password is incorrect', 401)
      }

      const hashedPassword = await this.hashProvider.generateHash(password)

      provider.password = hashedPassword

      await this.providersRepository.update(provider)
    }

    provider.name = name
    provider.cnpj = cnpj

    const updatedProvider = await this.providersRepository.update(provider)

    return updatedProvider
  }
}
