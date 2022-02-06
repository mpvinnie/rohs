import { ICreateProviderDTO } from '@modules/managers/dtos/ProvidersDTO'
import { Provider } from '@prisma/client'

export interface IProvidersRepository {
  findByCnpj(cnpj: string): Promise<Provider | null | undefined>
  findById(id: string): Promise<Provider | null | undefined>
  create(
    data: Omit<ICreateProviderDTO, 'manager_id'> & {
      id: string
      password: string
    }
  ): Promise<Provider>
  updateAvatar(id: string, avatar_filename: string): Promise<Provider>
  find(): Promise<Provider[]>
  update(
    data: Omit<Provider, 'created_at' | 'segment_id' | 'avatar'> & {
      segment: string
    }
  ): Promise<Provider>
}
