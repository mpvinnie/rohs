import { FakeContactsRepository } from '@modules/providers/repositories/fakes/FakeContactsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { ListProviderContactsUseCase } from './ListProviderContactsUseCase'

let providersRepository: FakeProvidersRepository
let contactsRepository: FakeContactsRepository
let listProviderContacts: ListProviderContactsUseCase

describe('ListProviderContacts', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    contactsRepository = new FakeContactsRepository()

    listProviderContacts = new ListProviderContactsUseCase(
      providersRepository,
      contactsRepository
    )
  })

  it('should be able to list all provider contacts', async () => {
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

    const providerContacts = await listProviderContacts.execute({
      provider_id: '12345678'
    })

    expect(providerContacts.length).toBe(1)
    expect(providerContacts[0]).toBe(contact)
    expect(providerContacts[0].provider_id).toBe('12345678')
  })

  it('should not be able to list contacts if provider not exists', async () => {
    await expect(
      listProviderContacts.execute({
        provider_id: 'non-existent-provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
