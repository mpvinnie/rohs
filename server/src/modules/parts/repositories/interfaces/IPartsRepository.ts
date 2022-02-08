import { ICreatePartDTO } from '@modules/parts/dtos/PartsDTO'
import { Part } from '@prisma/client'

export interface IPartsRepository {
  findProviderPartByCode(
    provider_id: string,
    code: string
  ): Promise<Part | null | undefined>
  create(data: ICreatePartDTO): Promise<Part>
  findAllByProviderId(provider_id: string): Promise<Part[]>
  findByProviderId(
    provider_id: string,
    part_id: string
  ): Promise<Part | null | undefined>
  findById(id: string): Promise<Part | null | undefined>
  update(part: Part): Promise<Part>
  findAllAvailableForReview(): Promise<Part[]>
}
