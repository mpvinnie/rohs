import { v4 as uuid } from 'uuid'

import { ICreateManagerDTO } from '@modules/managers/dtos/ICreateManagerDTO'
import { Manager } from '@prisma/client'

import { IManagersRepository } from '../interfaces/IManagersRepository'

export class FakeManagersRepository implements IManagersRepository {
  private managers: Manager[] = []

  async create({ email, password }: ICreateManagerDTO): Promise<Manager> {
    const manager: Manager = {
      id: uuid(),
      email,
      password,
      created_at: new Date()
    }

    this.managers.push(manager)

    return manager
  }

  async findByEmail(email: string): Promise<Manager | undefined> {
    const manager = this.managers.find(manager => manager.email === email)

    return manager
  }

  async findById(id: string): Promise<Manager | undefined> {
    const manager = this.managers.find(manager => manager.id === id)

    return manager
  }
}
