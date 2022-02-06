export interface IUpdateProviderAvatarDTO {
  provider_id: string
  avatar_filename: string
}

export interface IAuthenticateProviderDTO {
  id: string
  password: string
}

export interface IUpdateProviderProfileDTO {
  provider_id: string
  name: string
  cnpj: string
  old_password?: string
  password?: string
}
