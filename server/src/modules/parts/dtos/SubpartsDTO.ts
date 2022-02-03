export interface ICreateSubpartDTO {
  provider_id: string
  part_id: string
  name: string
  gwi_11a1: string
  fisp_msds: string
  rohs_report: string
  subgroup: string
}

export interface IDeleteSubpartDTO {
  provider_id: string
  part_id: string
  subpart_id: string
}
