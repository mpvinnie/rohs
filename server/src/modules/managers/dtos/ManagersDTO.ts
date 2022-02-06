export interface ICreateManagerDTO {
  email: string
}

export interface IAuthenticateManagerDTO {
  email: string
  password: string
}

export interface IListPartsSentForReviewDTO {
  manager_id: string
}
