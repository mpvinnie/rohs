import { ICreateSubpartDTO } from '@modules/parts/dtos/SubpartsDTO'
import { Subpart } from '@prisma/client'

export interface ISubpartsRepository {
  create(data: Omit<ICreateSubpartDTO, 'provider_id'>): Promise<Subpart>
}
