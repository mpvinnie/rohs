export type Provider = {
  id: string
  name: string
  cnpj: string
  segment_id: string
  segment: {
    id: string
    name: string
  }
  avatar: string
  avatar_url: string
}

export type UpdateProviderFirstAccess = Pick<Provider, 'segment'>

export type Contact = {
  id: string
  name: string
  email: string
  position: string
  phone_number: string
  department: {
    name: string
  }
}

export type CreateContact = Pick<
  Contact,
  'department' | 'name' | 'email' | 'position' | 'phone_number'
>

export enum PartStatus {
  NOT_SENT = 'NOT_SENT',
  SENT_FOR_REVIEW = 'SENT_FOR_REVIEW',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED',
  EXPIRED = 'EXPIRED'
}

export enum ReviewResolve {
  NOT_RESOLVED = 'NOT_RESOLVED',
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED'
}

export type Review = {
  id: string
  resolve: ReviewResolve
  comment?: string
  created_at: Date
  manager_id: string
  part_id: string
}

export type Part = {
  id: string
  provider_id: string
  code: string
  description: string
  status: PartStatus
  comment?: string
  created_at: Date | string
}

export type CreatePart = Pick<Part, 'code' | 'comment' | 'description'>

export enum MaterialTypeName {
  METAL = 'METAL',
  PLASTIC = 'PLASTIC',
  PAPER = 'PAPER',
  TAPE = 'TAPE'
}

export type Subpart = {
  id: string
  name: string
  gwi4_11a1: string
  fispq_msds: string
  rohs_report: string
  rohs_report_date: Date
  rohs_report_expiration_date: Date
  created_at: Date
  part_id: string
  material_type: {
    name: MaterialTypeName
  }
  gwi4_11a1_url: string
  fispq_msds_url: string
  rohs_report_url: string
}

export type PartWithSubparts = {
  id: string
  code: string
  description: string
  status: PartStatus
  comment?: string
  created_at: Date
  provider_id: string
  reviews: Review[]
  subparts: Subpart[]
  _count_subparts: 1
}
