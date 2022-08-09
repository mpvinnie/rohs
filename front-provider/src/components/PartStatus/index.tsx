import { Container } from './styles'

type PartStatusProps = {
  status: 'disapproved' | 'waiting' | 'approved'
}

const partStatus = {
  disapproved: 'Desaprovado',
  waiting: 'Aguardando',
  approved: 'Aprovado'
}

export function PartStatus({ status }: PartStatusProps): JSX.Element {
  return <Container status={status}>{partStatus[status]}</Container>
}
