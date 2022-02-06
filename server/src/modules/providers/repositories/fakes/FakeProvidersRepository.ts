import { v4 as uuid } from 'uuid'

import { ICreateProviderDTO } from '@modules/managers/dtos/ProvidersDTO'
import { Provider } from '@prisma/client'

import { IProvidersRepository } from '../interfaces/IProvidersRepository'

export class FakeProvidersRepository implements IProvidersRepository {
  private providers: Provider[] = []

  async findByCnpj(cnpj: string): Promise<Provider | undefined> {
    const provider = this.providers.find(provider => provider.cnpj === cnpj)

    return provider
  }

  async findById(id: string): Promise<Provider | undefined> {
    const provider = this.providers.find(provider => provider.id === id)

    return provider
  }

  async create({
    id,
    password,
    name,
    cnpj
  }: Omit<ICreateProviderDTO, 'manager_id'> & {
    id: string
    password: string
  }): Promise<Provider> {
    const provider: Provider = {
      id,
      password,
      name,
      cnpj,
      segment_id: uuid(),
      avatar: null,
      created_at: new Date()
    }

    this.providers.push(provider)

    return provider
  }

  async updateAvatar(id: string, avatar_filename: string): Promise<Provider> {
    const findIndex = this.providers.findIndex(provider => provider.id === id)

    this.providers[findIndex].avatar = avatar_filename

    return this.providers[findIndex]
  }

  async find(): Promise<Provider[]> {
    const providers = this.providers

    return providers
  }

  async update({
    id,
    cnpj,
    name,
    password
  }: Omit<Provider, 'created_at' | 'segment_id' | 'avatar'> & {
    segment: string
  }): Promise<Provider> {
    const findIndex = this.providers.findIndex(provider => provider.id === id)

    const provider = this.providers[findIndex]

    const updatedProvider: Provider = {
      id,
      cnpj,
      name,
      password,
      avatar: provider.avatar,
      created_at: provider.created_at,
      segment_id: uuid()
    }

    this.providers[findIndex] = updatedProvider

    return this.providers[findIndex]
  }
}
