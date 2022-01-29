import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IListProviderContactsDTO } from '@modules/providers/dtos/IListProviderContactsDTO'
import { listProviderContactsSchema } from '@modules/providers/schemas/contactSchemas'
import validateParams from '@utils/validateParams'

import { ListProviderContactsUseCase } from './ListProviderContactsUseCase'

export class ListProviderContactsController {
  async handle(request: Request, response: Response) {
    const { provider_id } = request

    validateParams<IListProviderContactsDTO>(
      { provider_id },
      listProviderContactsSchema
    )

    const listProviderContacts = container.resolve(ListProviderContactsUseCase)

    const contacts = await listProviderContacts.execute({ provider_id })

    return response.json(contacts)
  }
}
