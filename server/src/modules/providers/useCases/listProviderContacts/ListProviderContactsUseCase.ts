import { inject, injectable } from 'tsyringe'

import { IListProviderContactsDTO } from '@modules/providers/dtos/ContactsDTO'
import { IContactsRepository } from '@modules/providers/repositories/interfaces/IContactsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class ListProviderContactsUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({ provider_id, page, per_page }: IListProviderContactsDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const contacts = await this.contactsRepository.findByProviderId(provider_id)

    const _count = contacts.length

    if (page && per_page) {
      const skip = (page - 1) * per_page
      const take = page * per_page

      const paginatedContacts = contacts.slice(skip, take)
      return {
        contacts: paginatedContacts,
        _count
      }
    }

    return {
      contacts,
      _count
    }
  }
}
