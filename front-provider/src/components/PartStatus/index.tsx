import { Container } from './styles'

type PartStatusProps = {
  status:
    | 'DISAPPROVED'
    | 'UNDER_REVIEW'
    | 'APPROVED'
    | 'EXPIRED'
    | 'SENT_FOR_REVIEW'
    | 'NOT_SENT'
}

const partStatus = {
  NOT_SENT: 'NOT_SENT',
  SENT_FOR_REVIEW: 'SENT_FOR_REVIEW',
  UNDER_REVIEW: 'UNDER_REVIEW',
  APPROVED: 'APPROVED',
  DISAPPROVED: 'DISAPPROVED',
  EXPIRED: 'EXPIRED'
}

export function PartStatus({ status }: PartStatusProps): JSX.Element {
  return <Container status={status}>{partStatus[status]}</Container>
}
