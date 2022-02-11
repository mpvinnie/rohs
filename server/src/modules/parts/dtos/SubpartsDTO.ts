import { MaterialTypeName } from '@prisma/client'

export interface ICreateSubpartDTO {
  provider_id: string
  part_id: string
  name: string
  gwi4_11a1: string
  fispq_msds: string
  rohs_report: string
  rohs_report_date: Date
  rohs_report_expiration_date: Date
  material_type: MaterialTypeName
}

export interface IDeleteSubpartDTO {
  provider_id: string
  part_id: string
  subpart_id: string
}
