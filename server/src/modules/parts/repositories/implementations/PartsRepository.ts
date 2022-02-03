import { ICreatePartDTO } from '@modules/parts/dtos/PartsDTO'
import { Part } from '@prisma/client'
import { prisma } from '@shared/infra/prisma'

import { IPartsRepository } from '../interfaces/IPartsRepository'

export class PartsRepository implements IPartsRepository {
  async findProviderPartByCode(
    provider_id: string,
    code: string
  ): Promise<Part | null> {
    const part = await prisma.part.findFirst({
      where: {
        provider_id,
        code
      }
    })

    return part
  }

  async create({
    provider_id,
    code,
    description,
    comment
  }: ICreatePartDTO): Promise<Part> {
    const part = await prisma.part.create({
      data: {
        provider_id,
        code,
        description,
        comment
      }
    })

    return part
  }

  async findAllByProviderId(provider_id: string): Promise<Part[]> {
    const parts = await prisma.part.findMany({
      where: {
        provider_id
      },
      include: {
        disaproval_reason: true,
        subparts: {
          include: {
            subgroup: true
          }
        }
      }
    })

    return parts
  }

  async findByProviderId(
    provider_id: string,
    part_id: string
  ): Promise<Part | null> {
    const part = await prisma.part.findFirst({
      where: {
        provider_id,
        id: part_id
      },
      include: {
        subparts: true,
        disaproval_reason: true
      }
    })

    return part
  }
}
