export interface ICreateManagerDTO {
  email: string
}

export interface IAuthenticateManagerDTO {
  email: string
  password: string
}

export interface IListPartsAvailableForReviewDTO {
  manager_id: string
}
