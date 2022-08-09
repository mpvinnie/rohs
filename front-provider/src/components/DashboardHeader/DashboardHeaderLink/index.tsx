import { Icon } from 'react-feather'
import { LinkProps } from 'react-router-dom'

import { Container } from './styles'

interface DashboardHeaderLinkProps extends LinkProps {
  icon: Icon
  title: string
  description: string
  to: string
}

export function DashboardHeaderLink({
  icon: Icon,
  title,
  description,
  to,
  ...rest
}: DashboardHeaderLinkProps): JSX.Element {
  return (
    <Container to={to} {...rest}>
      <Icon size={64} />
      <span>{title}</span>
      <p>{description}</p>
    </Container>
  )
}
