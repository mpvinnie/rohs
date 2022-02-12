import { v4 as uuid } from 'uuid'

import { ICreateContactDTO } from '@modules/providers/dtos/ContactsDTO'
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

  async findByProviderId(provider_id: string): Promise<Contact[]> {
    const contacts = this.contacts.filter(
      contact => contact.provider_id === provider_id
    )

    return contacts
  }

  async findProviderContactById(
    provider_id: string,
    contact_id: string
  ): Promise<Contact | null | undefined> {
    const contact = this.contacts.find(
      contact =>
        contact.id === contact_id && contact.provider_id === provider_id
    )

    return contact
  }

  async delete(contact: Contact): Promise<void> {
    this.contacts = this.contacts.filter(
      findContact => findContact.id !== contact.id
    )
  }

  async update({
    id,
    name,
    email,
    phone_number,
    position
  }: { department: string } & Pick<
    Contact,
    'id' | 'email' | 'name' | 'phone_number' | 'position'
  >): Promise<Contact> {
    const findIndex = this.contacts.findIndex(contact => contact.id === id)
    const contact = this.contacts[findIndex]

    const updatedContact: Contact = {
      id,
      name,
      email,
      phone_number,
      position,
      created_at: contact.created_at,
      department_id: uuid(),
      provider_id: contact.provider_id
    }

    this.contacts[findIndex] = updatedContact

    return updatedContact
  }
}
