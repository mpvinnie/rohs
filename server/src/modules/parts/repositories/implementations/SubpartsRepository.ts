import { ICreateSubpartDTO } from '@modules/parts/dtos/SubpartsDTO'
import { Subpart } from '@prisma/client'
import { prisma } from '@shared/infra/prisma'

import { ISubpartsRepository } from '../interfaces/ISubpartsRepository'

export class SubpartsRepository implements ISubpartsRepository {
  async create({
    part_id,
    name,
    gwi_11a1,
    fisp_msds,
    rohs_report,
    subgroup
  }: ICreateSubpartDTO): Promise<Subpart> {
    const subpart = await prisma.subpart.create({
      data: {
        part: {
          connect: {
            id: part_id
          }
        },
        name,
        gwi_11a1,
        fisp_msds,
        rohs_report,
        subgroup: {
          connectOrCreate: {
            where: {
              name: subgroup
            },
            create: {
              name: subgroup
            }
          }
        }
      },
      include: {
        subgroup: true
      }
    })

    return subpart
  }
}
