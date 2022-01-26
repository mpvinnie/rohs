import { FakeContactsRepository } from '@modules/providers/repositories/fakes/FakeContactsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { CreateContactUseCase } from './CreateContactUseCase'

let providersRepository: FakeProvidersRepository
let contactsRepository: FakeContactsRepository
let createContact: CreateContactUseCase

describe('CreateContact', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    contactsRepository = new FakeContactsRepository()

    createContact = new CreateContactUseCase(
      providersRepository,
      contactsRepository
    )
  })

  it('should be able to create a new contact', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'segment'
    })

    const contact = await createContact.execute({
      provider_id: provider.id,
      department: 'department',
      email: 'contact@email.com',
      name: 'Contact Name',
      phone_number: '91248569784',
      position: 'position'
    })

    expect(contact).toHaveProperty('id')
    expect(contact.provider_id).toBe(provider.id)
  })

  it('should not be able to create a new contact if provider not exists', async () => {
    await expect(
      createContact.execute({
        provider_id: 'non-existent-provider-id',
        department: 'department',
        email: 'contact@email.com',
        name: 'Contact Name',
        phone_number: '91248569784',
        position: 'position'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new contact if email is already in use', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'segment'
    })

    await createContact.execute({
      provider_id: provider.id,
      department: 'department',
      email: 'contact@email.com',
      name: 'Contact Name',
      phone_number: '91248569784',
      position: 'position'
    })

    await expect(
      createContact.execute({
        provider_id: provider.id,
        department: 'department',
        email: 'contact@email.com',
        name: 'Contact Name',
        phone_number: '91248569785s',
        position: 'position'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new contact if phone number is already in use', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'segment'
    })

    await createContact.execute({
      provider_id: provider.id,
      department: 'department',
      email: 'contact1@email.com',
      name: 'Contact Name',
      phone_number: '91248569784',
      position: 'position'
    })

    await expect(
      createContact.execute({
        provider_id: provider.id,
        department: 'department',
        email: 'contact2@email.com',
        name: 'Contact Name',
        phone_number: '91248569784',
        position: 'position'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
