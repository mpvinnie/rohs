import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IListProviderContactsDTO } from '@modules/providers/dtos/ContactsDTO'
import { listProviderContactsSchema } from '@modules/providers/schemas/contactSchemas'
import validateParams from '@utils/validateParams'

import { ListProviderContactsUseCase } from './ListProviderContactsUseCase'

interface IParams {
  page?: number
  per_page?: number
}

export class ListProviderContactsController {
  async handle(request: Request, response: Response) {
    const { provider_id } = request
    const { page, per_page } = request.query as IParams

    validateParams<IListProviderContactsDTO>(
      { provider_id, page, per_page },
      listProviderContactsSchema
    )

    const listProviderContacts = container.resolve(ListProviderContactsUseCase)

    const contacts = await listProviderContacts.execute({
      provider_id,
      page,
      per_page
    })

    return response.json(contacts)
  }
}
