import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ICreateContactDTO } from '@modules/providers/dtos/ICreateContactDTO'
import { createContactSchema } from '@modules/providers/schemas/createContactSchema'
import validateParams from '@utils/validateParams'

import { CreateContactUseCase } from './CreateContactUseCase'

export class CreateContactController {
  async handle(request: Request, response: Response) {
    const { name, department, email, position, phone_number } = request.body

    const { provider_id } = request

    validateParams<ICreateContactDTO>(
      {
        provider_id,
        name,
        department,
        email,
        position,
        phone_number
      },
      createContactSchema
    )

    const createContact = container.resolve(CreateContactUseCase)

    const contact = await createContact.execute({
      provider_id,
      name,
      department,
      email,
      phone_number,
      position
    })

    return response.status(201).json(contact)
  }
}
