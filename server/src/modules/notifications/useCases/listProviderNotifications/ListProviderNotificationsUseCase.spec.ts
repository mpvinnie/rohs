import { FakeNotificationsRepository } from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { ListProviderNotificationsUseCase } from './ListProviderNotificationsUseCase'

let providersRepository: FakeProvidersRepository
let notificationsRepository: FakeNotificationsRepository
let listProviderNotifications: ListProviderNotificationsUseCase

describe('ListProviderNotifications', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    notificationsRepository = new FakeNotificationsRepository()

    listProviderNotifications = new ListProviderNotificationsUseCase(
      providersRepository,
      notificationsRepository
    )
  })

  it('should be able to list the provider notifications', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'Provider Name',
      cnpj: '12346578901234',
      password: 'password',
      segment: 'Segment'
    })

    const notification = await notificationsRepository.create({
      recipient_id: provider.id,
      content: 'content'
    })

    const notifications = await listProviderNotifications.execute({
      recipient_id: '12345678'
    })

    expect(notifications.length).toBe(1)
    expect(notifications[0]).toBe(notification)
  })

  it('should not be able to list the notifications of a non-existent provider', async () => {
    await expect(
      listProviderNotifications.execute({
        recipient_id: 'non-existent-provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
