import { v4 as uuid } from 'uuid'

import { ICreateSubpartDTO } from '@modules/parts/dtos/SubpartsDTO'
import { Subpart } from '@prisma/client'

import { ISubpartsRepository } from '../interfaces/ISubpartsRepository'

export class FakeSubpartsRepository implements ISubpartsRepository {
  private subparts: Subpart[] = []

  async create({
    part_id,
    name,
    gwi4_11a1,
    fispq_msds,
    rohs_report,
    rohs_report_date,
    rohs_report_expiration_date
  }: ICreateSubpartDTO): Promise<Subpart> {
    const subpart: Subpart = {
      id: uuid(),
      part_id,
      name,
      gwi4_11a1,
      fispq_msds,
      rohs_report,
      rohs_report_date,
      rohs_report_expiration_date,
      material_type_id: uuid(),
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

  async findAllByPartId(part_id: string): Promise<Subpart[]> {
    const subparts = this.subparts.filter(
      subpart => subpart.part_id === part_id
    )

    return subparts
  }
}
