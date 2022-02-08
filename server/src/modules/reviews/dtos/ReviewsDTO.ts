export interface ICreateReviewDTO {
  manager_id: string
  part_id: string
}

export interface IListManagerReviews {
  manager_id: string
}

export interface IApproveReviewDTO {
  manager_id: string
  part_id: string
  comment?: string
}
