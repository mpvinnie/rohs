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
  provider_id: string
  department: string
  name: string
  email: string
  position: string
  phone: string
  secondary_phone?: string
  created_at: Date
}

export type CreateContact = Pick<
  Contact,
  'department' | 'name' | 'email' | 'position' | 'phone' | 'secondary_phone'
>

type DisapprovalReason = {
  id: string
  part_id: string
  message: string
  created_at: Date
}

export type Part = {
  id: string
  provider_id: string
  part_code: string
  description: string
  status: 'disapproved' | 'waiting' | 'approved'
  is_active: boolean
  comment?: string
  is_blocked: boolean
  created_at: Date | string
  disapproval_reasons: Array<DisapprovalReason>
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
