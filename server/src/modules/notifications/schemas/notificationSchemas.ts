import joi from 'joi'

import { IListProviderNotificationsDTO } from '../dtos/NotificationsDTO'

export const listProviderNotificationsSchema =
  joi.object<IListProviderNotificationsDTO>({
    recipient_id: joi
      .string()
      .length(8)
      .required()
      .regex(/^\d+$/)
      .message('"provider_id" must only have digits')
  })
