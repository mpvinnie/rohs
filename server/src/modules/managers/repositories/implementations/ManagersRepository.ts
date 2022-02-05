import { ICreateManagerDTO } from '@modules/managers/dtos/ManagersDTO'
import { Manager } from '@prisma/client'
import { prisma } from '@shared/infra/prisma'

import { IManagersRepository } from '../interfaces/IManagersRepository'

export class ManagersRepository implements IManagersRepository {
  async create({
    email,
    password
  }: ICreateManagerDTO & { password: string }): Promise<Manager> {
    const manager = await prisma.manager.create({
      data: {
        email,
        password
      }
    })

    return manager
  }

  async findByEmail(email: string): Promise<Manager | null> {
    const manager = await prisma.manager.findUnique({
      where: {
        email
      }
    })

    return manager
  }

  async findById(id: string): Promise<Manager | null> {
    const manager = await prisma.manager.findUnique({
      where: { id }
    })

    return manager
  }
}
