import { inject, injectable } from 'tsyringe'

import { IContactsRepository } from '@modules/providers/repositories/interfaces/IContactsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

export interface IRequest {
  provider_id: string
}

@injectable()
export class ListProviderContactsUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ provider_id }: IRequest) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const contacts = await this.contactsRepository.findByProviderId(provider_id)

    return contacts
  }
}
