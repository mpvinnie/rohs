import { FakeContactsRepository } from '@modules/providers/repositories/fakes/FakeContactsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { UpdateContactUseCase } from './UpdateContactUseCase'

let providersRepository: FakeProvidersRepository
let contactsRepository: FakeContactsRepository
let updateContact: UpdateContactUseCase

describe('UpdateContact', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    contactsRepository = new FakeContactsRepository()

    updateContact = new UpdateContactUseCase(
      providersRepository,
      contactsRepository
    )
  })

  it('should be able to update a contact', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    const contact = await contactsRepository.create({
      provider_id: provider.id,
      name: 'Contact Name',
      email: 'contact@email.com',
      department: 'Department',
      phone_number: '99999999999',
      position: 'Position'
    })

    const contacts = await contactsRepository.findByProviderId(provider.id)

    expect(contacts[0]).toBe(contact)

    const updatedContact = await updateContact.execute({
      provider_id: provider.id,
      id: contact.id,
      name: 'New Contact Name',
      department: 'New Department',
      email: 'newcontact@email.com',
      phone_number: '99999999990',
      position: 'New Position'
    })

    const contactsWithUpdatedContact =
      await contactsRepository.findByProviderId(provider.id)

    expect(contactsWithUpdatedContact[0]).toBe(updatedContact)
  })

  it('should not be able to update a contact from a non-existent provider', async () => {
    await expect(
      updateContact.execute({
        provider_id: 'non-existent-provider-id',
        id: 'non-existent-contact-id',
        name: 'New Contact Name',
        department: 'New Department',
        email: 'newcontact@email.com',
        phone_number: '99999999990',
        position: 'New Position'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be be able to update a non-existent contact or contact from another provider', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    await expect(
      updateContact.execute({
        provider_id: provider.id,
        id: 'non-existent-contact-id',
        name: 'New Contact Name',
        department: 'New Department',
        email: 'newcontact@email.com',
        phone_number: '99999999990',
        position: 'New Position'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update a contact if email is already in use', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    const contact1 = await contactsRepository.create({
      provider_id: provider.id,
      name: 'Contact Name',
      email: 'contact1@email.com',
      department: 'Department',
      phone_number: '99999999999',
      position: 'Position'
    })

    const contact2 = await contactsRepository.create({
      provider_id: provider.id,
      name: 'Contact Name',
      email: 'contact2@email.com',
      department: 'Department',
      phone_number: '99999999990',
      position: 'Position'
    })

    await expect(
      updateContact.execute({
        provider_id: provider.id,
        id: contact1.id,
        name: 'New Contact Name',
        department: 'New Department',
        email: contact2.email,
        phone_number: '99999999999',
        position: 'New Position'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update a contact if phone number is already in use', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    const contact1 = await contactsRepository.create({
      provider_id: provider.id,
      name: 'Contact Name',
      email: 'contact1@email.com',
      department: 'Department',
      phone_number: '99999999999',
      position: 'Position'
    })

    const contact2 = await contactsRepository.create({
      provider_id: provider.id,
      name: 'Contact Name',
      email: 'contact2@email.com',
      department: 'Department',
      phone_number: '99999999990',
      position: 'Position'
    })

    await expect(
      updateContact.execute({
        provider_id: provider.id,
        id: contact1.id,
        name: 'New Contact Name',
        department: 'New Department',
        email: 'contact1@email.com',
        phone_number: contact2.phone_number,
        position: 'New Position'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
