import { inject, injectable } from 'tsyringe'

import { IUpdateProviderProfileDTO } from '@modules/providers/dtos/IUpdateProviderProfileDTO'
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
    segment,
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

    let hashedPassword

    if (old_password && password) {
      const passwordsMatched = await this.hashProvider.compareHash(
        old_password,
        provider.password
      )

      if (!passwordsMatched) {
        throw new AppError('Old password is incorrect', 401)
      }

      hashedPassword = await this.hashProvider.generateHash(password)
    }

    const updatedProvider = await this.providersRepository.update({
      id: provider_id,
      name,
      cnpj,
      segment,
      password: hashedPassword || provider.password
    })

    return updatedProvider
  }
}
