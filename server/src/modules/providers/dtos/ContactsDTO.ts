export interface ICreateContactDTO {
  provider_id: string
  department: string
  name: string
  email: string
  position: string
  phone_number: string
}

export interface IListProviderContactsDTO {
  provider_id: string
}

export interface IUpdateContactDTO {
  provider_id: string
  id: string
  department: string
  name: string
  email: string
  position: string
  phone_number: string
}
