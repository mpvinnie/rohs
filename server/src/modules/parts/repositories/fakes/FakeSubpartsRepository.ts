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

  async findByPartId(
    part_id: string,
    subpart_id: string
  ): Promise<Subpart | undefined> {
    const subpart = this.subparts.find(
      subpart => subpart.id === subpart_id && subpart.part_id === part_id
    )

    return subpart
  }

  async delete(subpart: Subpart): Promise<void> {
    this.subparts = this.subparts.filter(
      findSubpart => findSubpart.id !== subpart.id
    )
  }
}
