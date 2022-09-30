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
  page?: number
  per_page?: number
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

export interface IDeleteContactDTO {
  provider_id: string
  contact_id: string
}
