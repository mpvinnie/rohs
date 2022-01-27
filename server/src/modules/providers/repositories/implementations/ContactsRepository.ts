import { ICreateContactDTO } from '@modules/providers/dtos/ICreateContactDTO'
import { Contact } from '@prisma/client'
import { prisma } from '@shared/infra/prisma'

import { IContactsRepository } from '../interfaces/IContactsRepository'

export class ContactsRepository implements IContactsRepository {
  async create({
    provider_id,
    department,
    name,
    email,
    position,
    phone_number
  }: ICreateContactDTO): Promise<Contact> {
    const contact = await prisma.contact.create({
      data: {
        provider: {
          connect: {
            id: provider_id
          }
        },
        department: {
          connectOrCreate: {
            where: {
              name: department
            },
            create: {
              name: department
            }
          }
        },
        name,
        email,
        position,
        phone_number
      }
    })

    return contact
  }

  async findByEmail(email: string): Promise<Contact | null> {
    const contact = await prisma.contact.findUnique({
      where: { email }
    })

    return contact
  }

  async findByPhoneNumber(phone_number: string): Promise<Contact | null> {
    const contact = await prisma.contact.findUnique({
      where: { phone_number }
    })

    return contact
  }

  async findByProviderId(provider_id: string): Promise<Contact[]> {
    const contacts = await prisma.contact.findMany({
      where: {
        provider_id
      },
      include: {
        department: true
      }
    })

    return contacts
  }
}
