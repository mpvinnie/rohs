import { v4 as uuid } from 'uuid'

import { ICreatePartDTO } from '@modules/parts/dtos/PartsDTO'
import { Part } from '@prisma/client'

import { IPartsRepository } from '../interfaces/IPartsRepository'

export class FakePartsRepository implements IPartsRepository {
  private parts: Part[] = []

  async findProviderPartByCode(
    provider_id: string,
    code: string
  ): Promise<Part | undefined> {
    const part = this.parts.find(
      part => part.provider_id === provider_id && part.code === code
    )

    return part
  }

  async create({
    provider_id,
    code,
    description,
    comment
  }: ICreatePartDTO): Promise<Part> {
    const part: Part = {
      id: uuid(),
      provider_id,
      code,
      description,
      status: 'WAITING',
      comment: comment || null,
      created_at: new Date(),
      is_active: true,
      is_blocked: true,
      updated_at: new Date(),
      disaproval_reason_id: null
    }

    this.parts.push(part)

    return part
  }
}
