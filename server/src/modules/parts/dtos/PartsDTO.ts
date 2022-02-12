export interface ICreatePartDTO {
  provider_id: string
  code: string
  description: string
  comment?: string
}

export interface IListProviderPartsDTO {
  provider_id: string
}

export interface ISendPartForReviewDTO {
  provider_id: string
  part_id: string
}

export interface IShowPartWithSubpartsDTO {
  provider_id: string
  part_id: string
}

export interface IUpdatePartDTO {
  provider_id: string
  part_id: string
  description: string
  comment?: string
}

export interface IDeletePartDTO {
  provider_id: string
  part_id: string
}
