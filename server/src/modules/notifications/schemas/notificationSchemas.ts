import joi from 'joi'

import {
  IListProviderNotificationsDTO,
  IMarkNotificationAsReadDTO
} from '../dtos/NotificationsDTO'

export const listProviderNotificationsSchema =
  joi.object<IListProviderNotificationsDTO>({
    recipient_id: joi
      .string()
      .length(8)
      .required()
      .regex(/^\d+$/)
      .message('"provider_id" must only have digits')
  })

export const markNotificationAsReadSchema =
  joi.object<IMarkNotificationAsReadDTO>({
    notification_id: joi.string().uuid().required(),
    recipient_id: joi
      .string()
      .length(8)
      .required()
      .regex(/^\d+$/)
      .message('"provider_id" must only have digits')
  })
