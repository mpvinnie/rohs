import { FakeContactsRepository } from '@modules/providers/repositories/fakes/FakeContactsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { DeleteContactUseCase } from './DeleteContactUseCase'

let providersRepository: FakeProvidersRepository
let contactsRepository: FakeContactsRepository
let deleteContact: DeleteContactUseCase

describe('DeleteContact', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    contactsRepository = new FakeContactsRepository()

    deleteContact = new DeleteContactUseCase(
      providersRepository,
      contactsRepository
    )
  })

  it('should be able to delete a provider contact', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      cnpj: '12345678901234',
      name: 'Provider Name',
      password: 'password',
      segment: 'Segment'
    })

    const contact = await contactsRepository.create({
      provider_id: provider.id,
      department: 'Department',
      name: 'Contact Name',
      email: 'contact@email.com',
      phone_number: '92999999999',
      position: 'Position'
    })

    const contacts = await contactsRepository.findByProviderId(provider.id)

    expect(contacts[0]).toBe(contact)

    await deleteContact.execute({
      provider_id: provider.id,
      contact_id: contact.id
    })

    const contactsWithoutContact = await contactsRepository.findByProviderId(
      provider.id
    )

    expect(contactsWithoutContact.length).toBe(0)
  })

  it('should not be able to delete a contact if provider non exists', async () => {
    await expect(
      deleteContact.execute({
        provider_id: 'non-existent-provider-id',
        contact_id: 'non-existent-contact-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a non existent provider contact', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      cnpj: '12345678901234',
      name: 'Provider Name',
      password: 'password',
      segment: 'Segment'
    })

    await expect(
      deleteContact.execute({
        provider_id: provider.id,
        contact_id: 'non-existent-contact-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
