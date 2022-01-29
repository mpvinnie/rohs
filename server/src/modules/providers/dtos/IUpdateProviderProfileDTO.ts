export interface IUpdateProviderProfileDTO {
  provider_id: string
  name: string
  cnpj: string
  segment: string
  old_password?: string
  password?: string
}
