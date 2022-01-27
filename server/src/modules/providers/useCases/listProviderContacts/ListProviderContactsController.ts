import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { listProviderContactsSchema } from '@modules/providers/schemas/listProviderContactsSchema'
import validateParams from '@utils/validateParams'

import {
  IRequest,
  ListProviderContactsUseCase
} from './ListProviderContactsUseCase'

export class ListProviderContactsController {
  async handle(request: Request, response: Response) {
    const { provider_id } = request

    validateParams<IRequest>({ provider_id }, listProviderContactsSchema)

    const listProviderContacts = container.resolve(ListProviderContactsUseCase)

    const contacts = await listProviderContacts.execute({ provider_id })

    return response.json(contacts)
  }
}
