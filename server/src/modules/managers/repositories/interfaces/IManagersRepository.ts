import { ICreateManagerDTO } from '@modules/managers/dtos/ManagersDTO'
import { Manager } from '@prisma/client'

export interface IManagersRepository {
  create(data: ICreateManagerDTO & { password: string }): Promise<Manager>
  findByEmail(email: string): Promise<Manager | null | undefined>
  findById(id: string): Promise<Manager | null | undefined>
}
