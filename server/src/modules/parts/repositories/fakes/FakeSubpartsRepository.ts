import { v4 as uuid } from 'uuid'

import { ICreateSubpartDTO } from '@modules/parts/dtos/SubpartsDTO'
import { Subpart } from '@prisma/client'

import { ISubpartsRepository } from '../interfaces/ISubpartsRepository'

export class FakeSubpartsRepository implements ISubpartsRepository {
  private subparts: Subpart[] = []

  async create({
    part_id,
    name,
    gwi_11a1,
    fisp_msds,
    rohs_report
  }: ICreateSubpartDTO): Promise<Subpart> {
    const subpart: Subpart = {
      id: uuid(),
      part_id,
      name,
      gwi_11a1,
      fisp_msds,
      rohs_report,
      subgroup_id: uuid(),
      created_at: new Date(),
      updated_at: new Date()
    }

    this.subparts.push(subpart)

    return subpart
  }
}
