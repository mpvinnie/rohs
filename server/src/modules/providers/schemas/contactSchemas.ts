import joi from 'joi'

import { ICreateContactDTO } from '../dtos/ContactsDTO'
import { IListProviderContactsDTO } from '../dtos/IListProviderContactsDTO'
import { IUpdateContactDTO } from '../dtos/IUpdateContactDTO'
import { IRequest } from '../useCases/deleteContact/DeleteContactUseCase'

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

export const deleteContactSchema = joi.object<IRequest>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits'),
  contact_id: joi.string().uuid().required()
})

export const listProviderContactsSchema = joi.object<IListProviderContactsDTO>({
  provider_id: joi
    .string()
    .length(8)
    .required()
    .regex(/^\d+$/)
    .message('"provider_id" must only have digits')
})

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
