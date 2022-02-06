import { ICreateProviderDTO } from '@modules/managers/dtos/ProvidersDTO'
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
      where: { id },
      include: {
        segment: true
      }
    })

    return provider
  }

  async create({
    id,
    password,
    name,
    cnpj,
    segment
  }: Omit<ICreateProviderDTO, 'manager_id'> & {
    id: string
    password: string
  }): Promise<Provider> {
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

  async find(): Promise<Provider[]> {
    const providers = await prisma.provider.findMany({
      include: {
        segment: true
      }
    })

    return providers
  }

  async update({
    id,
    name,
    cnpj,
    avatar,
    password
  }: Provider): Promise<Provider> {
    const updatedProvider = await prisma.provider.update({
      where: {
        id
      },
      data: {
        name,
        cnpj,
        avatar,
        password
      },
      include: {
        segment: true
      }
    })

    return updatedProvider
  }
}
