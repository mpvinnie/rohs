export interface ICreatePartDTO {
  provider_id: string
  code: string
  description: string
  comment?: string
}

export interface IListProviderPartsDTO {
  provider_id: string
}

export interface IShowPartDTO {
  provider_id: string
  part_id: string
}