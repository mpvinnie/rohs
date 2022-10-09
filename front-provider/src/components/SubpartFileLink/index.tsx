import { FileText } from 'react-feather'

import { Container } from './styles'

interface SubpartFileLinkProps {
  to: string
}

export function SubpartFileLink({ to }: SubpartFileLinkProps): JSX.Element {
  return (
    <Container href={to} target="_blank">
      <FileText size={18} />
    </Container>
  )
}
