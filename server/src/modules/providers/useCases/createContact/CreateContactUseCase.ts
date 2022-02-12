import { inject, injectable } from 'tsyringe'

import { ICreateContactDTO } from '@modules/providers/dtos/ContactsDTO'
import { IContactsRepository } from '@modules/providers/repositories/interfaces/IContactsRepository'
import { IProvidersRepository } from '@modules/providers/repositories/interfaces/IProvidersRepository'
import { AppError } from '@shared/errors/AppError'

@injectable()
export class CreateContactUseCase {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,
    @inject('ContactsRepository')
    private contactsRepository: IContactsRepository
  ) {}

  async execute({
    provider_id,
    department,
    name,
    email,
    position,
    phone_number
  }: ICreateContactDTO) {
    const provider = await this.providersRepository.findById(provider_id)

    if (!provider) {
      throw new AppError('No provider found for this id', 404)
    }

    const emailAlreadyInUse = await this.contactsRepository.findByEmail(email)

    if (emailAlreadyInUse) {
      throw new AppError('The email is already in use')
    }

    const phoneNumberAlreadyInUse =
      await this.contactsRepository.findByPhoneNumber(phone_number)

    if (phoneNumberAlreadyInUse) {
      throw new AppError('The phone number is already in use')
    }

    const contact = await this.contactsRepository.create({
      provider_id,
      department,
      name,
      email,
      position,
      phone_number
    })

    return contact
  }
}
