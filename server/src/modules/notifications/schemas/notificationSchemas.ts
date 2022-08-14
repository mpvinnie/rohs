import joi from 'joi'

import {
  IDeleteNotificationDTO,
  IListProviderNotificationsDTO,
  IMarkAllAsReadDTO,
  IMarkNotificationAsReadDTO
} from '../dtos/NotificationsDTO'

export const listProviderNotificationsSchema =
  joi.object<IListProviderNotificationsDTO>({
    recipient_id: joi
      .string()
      .length(8)
      .required()
      .regex(/^\d+$/)
      .message('"recipient_id" must only have digits')
  })

export const markNotificationAsReadSchema =
  joi.object<IMarkNotificationAsReadDTO>({
    notification_id: joi.string().uuid().required(),
    recipient_id: joi
      .string()
      .length(8)
      .required()
      .regex(/^\d+$/)
      .message('"recipient_id" must only have digits')
  })

export const markAllAsReadSchema = joi.object<IMarkAllAsReadDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits')
})

export const deleteNotificationSchema = joi.object<IDeleteNotificationDTO>({
  notification_id: joi.string().uuid().required(),
  recipient_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"recipient_id" must only have digits')
})
