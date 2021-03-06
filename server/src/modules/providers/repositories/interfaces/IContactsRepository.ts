import { ICreateContactDTO } from '@modules/providers/dtos/ContactsDTO'
import { Contact } from '@prisma/client'

export interface IContactsRepository {
  create(data: ICreateContactDTO): Promise<Contact>
  findByEmail(email: string): Promise<Contact | null | undefined>
  findByPhoneNumber(phone_number: string): Promise<Contact | null | undefined>
  findByProviderId(provider_id: string): Promise<Contact[]>
  findProviderContactById(
    provider_id: string,
    contact_id: string
  ): Promise<Contact | null | undefined>
  delete(contact: Contact): Promise<void>
  update(
    contact: { department: string } & Pick<
      Contact,
      'id' | 'email' | 'name' | 'phone_number' | 'position'
    >
  ): Promise<Contact>
}
