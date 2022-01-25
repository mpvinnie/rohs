import { ICreateProviderDTO } from '@modules/providers/dtos/ICreateProviderDTO'
import { Provider } from '@prisma/client'

export interface IProvidersRepository {
  findByCnpj(cnpj: string): Promise<Provider | null | undefined>
  findById(id: string): Promise<Provider | null | undefined>
  create(data: ICreateProviderDTO): Promise<Provider>
}
