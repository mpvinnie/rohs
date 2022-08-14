import { FakeNotificationsRepository } from '@modules/notifications/repositories/fakes/FakeNotificationsRepository'
import { FakeProvidersRepository } from '@modules/providers/repositories/fakes/FakeProvidersRepository'
import { AppError } from '@shared/errors/AppError'

import { DeleteNotificationUseCase } from './DeleteNotificationUseCase'

let providersRepository: FakeProvidersRepository
let notificationsRepository: FakeNotificationsRepository
let deleteNotification: DeleteNotificationUseCase

describe('DeleteNotification', () => {
  beforeEach(() => {
    providersRepository = new FakeProvidersRepository()
    notificationsRepository = new FakeNotificationsRepository()
    deleteNotification = new DeleteNotificationUseCase(
      providersRepository,
      notificationsRepository
    )
  })

  it('should be able to delete a notification', async () => {
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

    const sentNotification =
      await notificationsRepository.findByProviderAndNotificationId(
        provider.id,
        notification.id
      )

    expect(sentNotification).toBe(notification)

    await deleteNotification.execute({
      recipient_id: provider.id,
      notification_id: notification.id
    })

    const deletedNotification =
      await notificationsRepository.findByProviderAndNotificationId(
        provider.id,
        notification.id
      )

    expect(deletedNotification).toBeUndefined()
  })

  it('should not be able to delete a notification if recipient non-exists', async () => {
    await expect(
      deleteNotification.execute({
        recipient_id: 'non-existent-provider-id',
        notification_id: 'notification_id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a notification if its non-exists', async () => {
    const provider = await providersRepository.create({
      id: '12345678',
      cnpj: '12345678901234',
      name: 'provider name',
      password: 'password',
      segment: 'segment'
    })

    await expect(
      deleteNotification.execute({
        recipient_id: provider.id,
        notification_id: 'non-existent-notification-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
