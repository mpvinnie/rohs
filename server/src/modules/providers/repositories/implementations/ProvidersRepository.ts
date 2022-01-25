import { ICreateProviderDTO } from '@modules/providers/dtos/ICreateProviderDTO'
import { Provider } from '@prisma/client'
import { prisma } from '@shared/infra/prisma'

import { IProvidersRepository } from '../interfaces/IProvidersRepository'

export class ProvidersRepository implements IProvidersRepository {
  async findByCnpj(cnpj: string): Promise<Provider | null | undefined> {
    const provider = await prisma.provider.findUnique({
      where: {
        cnpj
      }
    })

    return provider
  }

  async findById(id: string): Promise<Provider | null> {
    const provider = await prisma.provider.findUnique({
      where: { id }
    })

    return provider
  }

  async create({
    id,
    password,
    name,
    cnpj,
    segment
  }: ICreateProviderDTO): Promise<Provider> {
    const provider = await prisma.provider.create({
      data: {
        id,
        password,
        name,
        cnpj,
        segment: {
          connectOrCreate: {
            where: {
              name: segment
            },
            create: {
              name: segment
            }
          }
        }
      }
    })

    return provider
  }
}
