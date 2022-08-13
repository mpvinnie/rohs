import { FakeNotificationsRepository } from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { MarkAllAsReadUseCase } from './MarkAllAsReadUseCase'

let providersRepository: FakeProvidersRepository
let notificationsRepository: FakeNotificationsRepository
let markAllAsRead: MarkAllAsReadUseCase

describe('MarkAllAsRead', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    notificationsRepository = new FakeNotificationsRepository()
    markAllAsRead = new MarkAllAsReadUseCase(
      providersRepository,
      notificationsRepository
    )
  })

  it('should be able to mark all unread notifications as read', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'provider name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'segment'
    })

    const notification1 = await notificationsRepository.create({
      recipient_id: provider.id,
      content: 'notification content'
    })

    const notification2 = await notificationsRepository.create({
      recipient_id: provider.id,
      content: 'notification content'
    })

    const readNotifications = await markAllAsRead.execute({
      provider_id: provider.id
    })

    expect(readNotifications.length).toBe(2)
    expect(readNotifications[0]).toBe(notification1)
    expect(readNotifications[1]).toBe(notification2)
    expect(readNotifications[0].is_read).toBe(true)
    expect(readNotifications[1].is_read).toBe(true)
  })

  it('should not be able to mark all unread notifications as read if provider not exists', async () => {
    await expect(
      markAllAsRead.execute({
        provider_id: 'non-existent-provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to mark as read if all notifications had been read', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      name: 'provider name',
      cnpj: '12345678901234',
      password: 'password',
      segment: 'segment'
    })

    await expect(
      markAllAsRead.execute({
        provider_id: provider.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
