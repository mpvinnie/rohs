import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { deleteContactSchema } from '@modules/providers/schemas/contactSchemas'
import validateParams from '@utils/validateParams'

import { DeleteContactUseCase, IRequest } from './DeleteContactUseCase'

export class DeleteContactController {
  async handle(request: Request, response: Response) {
    const { id: contact_id } = request.params

    const { provider_id } = request

    validateParams<IRequest>({ provider_id, contact_id }, deleteContactSchema)

    const deleteContact = container.resolve(DeleteContactUseCase)

    await deleteContact.execute({
      provider_id,
      contact_id
    })

    return response.send()
  }
}
