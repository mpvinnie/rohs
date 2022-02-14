import 'reflect-metadata'
import cron from 'node-cron'

import { NotificationsRepository } from '@modules/notifications/repositories/implementations/NotificationsRepository'

import { prisma } from '../prisma'
import { io } from './app'

const notificationsRepository = new NotificationsRepository()

cron.schedule('*/1 * * * * *', async () => {
  const currentDate = new Date()

  const expiredSubparts = await prisma.subpart.findMany({
    where: {
      rohs_report_expiration_date: {
        lt: currentDate
      }
    }
  })

  // adicionar provider_id na tabela de subparts
  // verificar o provider conectado no socket e enviar apenas as notificações que tenham o provider_id dele.

  expiredSubparts.forEach(async expiredSubpart => {
    const notification = await notificationsRepository.create({
      provider_id: 'provider_id',
      message: 'subpart expirada'
    })

    io.emit('new_notification', notification)
  })
})
