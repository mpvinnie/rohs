import { inject, injectable } from 'tsyringe'

import { IUpdateContactDTO } from '@modules/providers/dtos/IUpdateContactDTO'
import { IContactsRepository } from '@modules/providers/repositories/interfaces/IContactsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class UpdateContactUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({
    provider_id,
    id,
    name,
    email,
    department,
    phone_number,
    position
  }: IUpdateContactDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const contact = await this.contactsRepository.findProviderContactById(
      provider_id,
      id
    )

    if (!contact) {
      throw new AppError('No contact found for this id', 404)
    }

    const emailContactExists = await this.contactsRepository.findByEmail(email)

    if (emailContactExists && emailContactExists.id !== contact.id) {
      throw new AppError('The email provided is already in use')
    }

    const phoneNumberContactExists =
      await this.contactsRepository.findByPhoneNumber(phone_number)

    if (
      phoneNumberContactExists &&
      phoneNumberContactExists.id !== contact.id
    ) {
      throw new AppError('The phone number provided is already in use')
    }

    const updatedContact = await this.contactsRepository.update({
      id,
      name,
      email,
      department,
      phone_number,
      position
    })

    return updatedContact
  }
}
