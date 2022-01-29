import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { FakeHashProvider } from '@shared/containers/providers/HashProvider/fakes/FakeHashProvider'
import { AppError } from '@shared/errors/AppError'

import { UpdateProviderProfileUseCase } from './UpdateProviderProfileUseCase'

let providersRepository: FakeProvidersRepository
let hashProvider: FakeHashProvider
let updateProviderProfile: UpdateProviderProfileUseCase

describe('UpdateProviderProfile', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    hashProvider = new FakeHashProvider()

    updateProviderProfile = new UpdateProviderProfileUseCase(
      providersRepository,
      hashProvider
    )
  })

  it('should be able to update the provider profile', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    const updatedProvider = await updateProviderProfile.execute({
      provider_id: provider.id,
      name: 'New Provider Name',
      cnpj: '01234567890123',
      segment: 'New Segment'
    })

    const findUpdatedProvider = (await providersRepository.findById(
      provider.id
    )) as typeof provider

    expect(updatedProvider.id).toBe(findUpdatedProvider.id)
    expect(findUpdatedProvider).toBe(updatedProvider)
  })

  it('should not be able to update the profile of a non existent provider', async () => {
    await expect(
      updateProviderProfile.execute({
        provider_id: 'non-existent-provider-id',
        name: 'New Provider Name',
        cnpj: '01234567890123',
        segment: 'New Segment',
        old_password: 'password',
        password: 'new_password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the provider profile if cnpj is already in use', async () => {
    const provider1 = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    const provider2 = await providersRepository.create({
      id: '12345679',
      name: 'Provider Name',
      cnpj: '12345678901235',
      password: 'password',
      segment: 'Segment'
    })

    await expect(
      updateProviderProfile.execute({
        provider_id: provider1.id,
        name: 'New Provider Name',
        cnpj: provider2.cnpj,
        segment: 'New Segment',
        old_password: 'password',
        password: 'new_password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the provider profile with password ', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    const updatedProvider = await updateProviderProfile.execute({
      provider_id: provider.id,
      name: 'New Provider Name',
      cnpj: '01234567890123',
      segment: 'New Segment',
      old_password: 'password',
      password: 'new_password'
    })

    const findUpdatedProvider = (await providersRepository.findById(
      provider.id
    )) as typeof provider

    expect(updatedProvider.id).toBe(findUpdatedProvider.id)
    expect(findUpdatedProvider).toBe(updatedProvider)
  })

  it('should not be able to update the provider profile with a wrong old password ', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'Segment'
    })

    await expect(
      updateProviderProfile.execute({
        provider_id: provider.id,
        name: 'New Provider Name',
        cnpj: '01234567890123',
        segment: 'New Segment',
        old_password: 'wrong_password',
        password: 'new_password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
