import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { IUpdateContactDTO } from '@modules/providers/dtos/IUpdateContactDTO'
import { updateContactSchema } from '@modules/providers/schemas/contactSchemas'
import validateParams from '@utils/validateParams'

import { UpdateContactUseCase } from './UpdateContactUseCase'

export class UpdateContactController {
  async handle(request: Request, response: Response) {
    const { department, name, email, position, phone_number } = request.body

    const { id } = request.params

    const { provider_id } = request

    validateParams<IUpdateContactDTO>(
      {
        provider_id,
        id,
        name,
        email,
        department,
        phone_number,
        position
      },
      updateContactSchema
    )

    const updateContact = container.resolve(UpdateContactUseCase)

    const contact = await updateContact.execute({
      provider_id,
      id,
      name,
      department,
      email,
      phone_number,
      position
    })

    return response.json(contact)
  }
}
