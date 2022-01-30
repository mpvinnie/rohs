import { ICreatePartDTO } from '@modules/parts/dtos/PartsDTO'
import { Part } from '@prisma/client'

export interface IPartsRepository {
  findProviderPartByCode(
    provider_id: string,
    code: string
  ): Promise<Part | null | undefined>
  create(data: ICreatePartDTO): Promise<Part>
}
