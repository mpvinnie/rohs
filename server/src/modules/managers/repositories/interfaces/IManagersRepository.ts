import { ICreateManagerDTO } from '@modules/managers/dtos/ICreateManagerDTO'
import { Manager } from '@prisma/client'

export interface IManagersRepository {
  create(data: ICreateManagerDTO): Promise<Manager>
  findByEmail(email: string): Promise<Manager | null | undefined>
  findById(id: string): Promise<Manager | null | undefined>
}
