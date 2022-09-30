import joi from 'joi'

import {
  ICreateContactDTO,
  IDeleteContactDTO,
  IListProviderContactsDTO,
  IUpdateContactDTO
} from '../dtos/ContactsDTO'

export const createContactSchema = joi.object<ICreateContactDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  department: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone_number: joi
    .string()
    .length(11)
    .required()
    .regex(/^\d+$/)
    .message('"phone_number" must only have digits'),
  position: joi.string().required()
})

export const deleteContactSchema = joi.object<IDeleteContactDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  contact_id: joi.string().uuid().required()
})

export const listProviderContactsSchema = joi
  .object<IListProviderContactsDTO>({
    provider_id: joi
      .string()
      .length(8)
      .required()
      .regex(/^\d+$/)
      .message('"provider_id" must only have digits'),
    page: joi.number(),
    per_page: joi.number()
  })
  .with('page', 'per_page')

export const updateContactSchema = joi.object<IUpdateContactDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  department: joi.string().required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone_number: joi
    .string()
    .length(11)
    .required()
    .regex(/^\d+$/)
    .message('"phone_number" must only have digits'),
  position: joi.string().required(),
  id: joi.string().uuid().required()
})
