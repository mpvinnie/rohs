import { FakeNotificationsRepository } from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { MarkNotificationAsReadUseCase } from './MarkNotificationAsReadUseCase'

let notificationsRepository: FakeNotificationsRepository
let providersRepository: FakeProvidersRepository
let markNotificationAsRead: MarkNotificationAsReadUseCase

describe('MarkNotificationAsRead', () => {
  beforeEach(() => {
    notificationsRepository = new FakeNotificationsRepository()
    providersRepository = new FakeProvidersRepository()
    markNotificationAsRead = new MarkNotificationAsReadUseCase(
      notificationsRepository,
      providersRepository
    )
  })

  it('should be able to mark a notification as read', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      cnpj: '12345678901234',
      name: 'provider name',
      password: 'password',
      segment: 'segment'
    })

    const notification = await notificationsRepository.create({
      recipient_id: provider.id,
      content: 'content'
    })

    const readNotification = await markNotificationAsRead.execute({
      notification_id: notification.id,
      recipient_id: provider.id
    })

    expect(readNotification.id).toBe(notification.id)
    expect(readNotification.is_read).toBe(true)
  })

  it('should not be able to mark a notification as read if provider not exists', async () => {
    await expect(
      markNotificationAsRead.execute({
        notification_id: 'notification_id',
        recipient_id: 'non-existent-provider-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to mark as read a non-existent notification', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      cnpj: '12345678901234',
      name: 'provider name',
      password: 'password',
      segment: 'segment'
    })

    await expect(
      markNotificationAsRead.execute({
        notification_id: 'non-existent-notification-id',
        recipient_id: provider.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to mark a notification as read if it has already been read', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      cnpj: '12345678901234',
      name: 'provider name',
      password: 'password',
      segment: 'segment'
    })

    const notification = await notificationsRepository.create({
      recipient_id: provider.id,
      content: 'content'
    })

    await markNotificationAsRead.execute({
      notification_id: notification.id,
      recipient_id: provider.id
    })

    const readNotification = await markNotificationAsRead.execute({
      notification_id: notification.id,
      recipient_id: provider.id
    })

    expect(readNotification.id).toBe(notification.id)
    expect(readNotification.is_read).toBe(true)
  })
})
