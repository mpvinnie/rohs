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

export const partStatus = {
  NOT_SENT: 'Em configuração',
  SENT_FOR_REVIEW: 'Enviado para análise',
  UNDER_REVIEW: 'Sob análise',
  APPROVED: 'Aprovado',
  DISAPPROVED: 'Desaprovado',
  EXPIRED: 'Expirado'
}

export function PartStatus({ status }: PartStatusProps): JSX.Element {
  return <Container status={status}>{partStatus[status]}</Container>
}
