import { ICreateSubpartDTO } from '@modules/parts/dtos/SubpartsDTO'
import { Subpart } from '@prisma/client'
import { prisma } from '@shared/infra/prisma'

import { ISubpartsRepository } from '../interfaces/ISubpartsRepository'

export class SubpartsRepository implements ISubpartsRepository {
  async create({
    part_id,
    name,
    gwi4_11a1,
    fispq_msds,
    rohs_report,
    rohs_report_date,
    rohs_report_expiration_date,
    material_type
  }: ICreateSubpartDTO): Promise<Subpart> {
    const subpart = await prisma.subpart.create({
      data: {
        part: {
          connect: {
            id: part_id
          }
        },
        name,
        gwi4_11a1,
        fispq_msds,
        rohs_report,
        rohs_report_date,
        rohs_report_expiration_date,
        material_type: {
          connectOrCreate: {
            where: {
              name: material_type
            },
            create: {
              name: material_type
            }
          }
        }
      },
      include: {
        material_type: true
      }
    })

    return subpart
  }

  async findByPartId(
    part_id: string,
    subpart_id: string
  ): Promise<Subpart | null> {
    const subpart = await prisma.subpart.findFirst({
      where: {
        part_id,
        id: subpart_id
      }
    })

    return subpart
  }

  async delete(subpart: Subpart): Promise<void> {
    await prisma.subpart.delete({
      where: {
        id: subpart.id
      }
    })
  }

  async findAllByPartId(part_id: string): Promise<Subpart[]> {
    const subparts = await prisma.subpart.findMany({
      where: { part_id },
      include: {
        material_type: true
      }
    })

    return subparts
  }
}
