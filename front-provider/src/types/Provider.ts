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

type DisapprovalReason = {
  id: string
  part_id: string
  message: string
  created_at: Date
}

enum PartStatus {
  NOT_SENT = 'NOT_SENT',
  SENT_FOR_REVIEW = 'SENT_FOR_REVIEW',
  UNDER_REVIEW = 'UNDER_REVIEW',
  APPROVED = 'APPROVED',
  DISAPPROVED = 'DISAPPROVED',
  EXPIRED = 'EXPIRED'
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

export type Subpart = {
  id: string
  provider_id: string
  part_id: string
  name: string
  subgroup: string
  report_date: Date | string
  gwi_11a1: string
  fisp_msds: string
  rohs_report: string
  gwi_11a1_url: string
  fisp_msds_url: string
  rohs_report_url: string
  created_at: Date | string
}
