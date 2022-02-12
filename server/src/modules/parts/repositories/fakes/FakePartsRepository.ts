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
      status: 'NOT_SENT',
      comment: comment || null,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.parts.push(part)

    return part
  }

  async findAllByProviderId(provider_id: string): Promise<Part[]> {
    const parts = this.parts.filter(part => part.provider_id === provider_id)

    return parts
  }

  async findByProviderId(
    provider_id: string,
    part_id: string
  ): Promise<Part | null | undefined> {
    const part = this.parts.find(
      part => part.id === part_id && part.provider_id === provider_id
    )

    return part
  }

  async findById(id: string): Promise<Part | undefined> {
    const part = this.parts.find(part => part.id === id)

    return part
  }

  async update(part: Part): Promise<Part> {
    const findIndex = this.parts.findIndex(findPart => findPart.id === part.id)

    this.parts[findIndex] = part

    return this.parts[findIndex]
  }

  async findAllAvailableForReview(): Promise<Part[]> {
    const parts = this.parts.filter(part => part.status === 'SENT_FOR_REVIEW')

    return parts
  }

  async delete(part: Part): Promise<void> {
    this.parts = this.parts.filter(findPart => findPart.id !== part.id)
  }
}
