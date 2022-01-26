import { v4 as uuid } from 'uuid'

import { ICreateContactDTO } from '@modules/providers/dtos/ICreateContactDTO'
import { Contact } from '@prisma/client'

import { IContactsRepository } from '../interfaces/IContactsRepository'

export class FakeContactsRepository implements IContactsRepository {
  private contacts: Contact[] = []

  async create({
    provider_id,
    department: _department,
    name,
    email,
    phone_number,
    position
  }: ICreateContactDTO): Promise<Contact> {
    const contact: Contact = {
      id: uuid(),
      provider_id,
      name,
      department_id: uuid(),
      email,
      phone_number,
      position,
      created_at: new Date()
    }

    this.contacts.push(contact)

    return contact
  }

  async findByEmail(email: string): Promise<Contact | undefined> {
    const contact = this.contacts.find(contact => contact.email === email)

    return contact
  }

  async findByPhoneNumber(phone_number: string): Promise<Contact | undefined> {
    const contact = this.contacts.find(
      contact => contact.phone_number === phone_number
    )

    return contact
  }
}
