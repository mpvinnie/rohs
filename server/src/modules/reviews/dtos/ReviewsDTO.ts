export interface ICreateReviewDTO {
  manager_id: string
  part_id: string
}

export interface IListManagerReviewsDTO {
  manager_id: string
}

export interface IApproveReviewDTO {
  manager_id: string
  review_id: string
  comment?: string
}

export interface IDisapproveReviewDTO {
  manager_id: string
  review_id: string
  comment: string
}
