import { v4 as uuid } from 'uuid'

import { ICreateProviderDTO } from '@modules/providers/dtos/ICreateProviderDTO'
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
    cnpj,
    segment: _segment
  }: ICreateProviderDTO): Promise<Provider> {
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

  async update(provider: Provider): Promise<Provider> {
    const findIndex = this.providers.findIndex(
      findProvider => findProvider.id === provider.id
    )

    this.providers[findIndex] = provider

    return provider
  }
}
