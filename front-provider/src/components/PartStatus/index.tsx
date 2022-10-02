import { HTMLAttributes } from 'react'

import { Container } from './styles'

interface PartStatusProps extends HTMLAttributes<HTMLDivElement> {
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

export function PartStatus({ status, ...rest }: PartStatusProps): JSX.Element {
  return (
    <Container {...rest} status={status}>
      {partStatus[status]}
    </Container>
  )
}
