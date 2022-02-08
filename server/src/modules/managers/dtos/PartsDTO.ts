export interface IApprovePartDTO {
  manager_id: string
  part_id: string
  comment?: string
}

export interface IListPartsAvailableForReviewDTO {
  manager_id: string
}
