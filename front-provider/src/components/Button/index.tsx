import { ButtonHTMLAttributes } from 'react'
import { Icon } from 'react-feather'
import { useHistory } from 'react-router'

import { Container } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: Icon
  title?: string
  to?: string
}

export function Button({
  icon: Icon,
  title,
  to,
  ...rest
}: ButtonProps): JSX.Element {
  const { push } = useHistory()

  return to ? (
    <Container {...rest} onClick={() => push(to)}>
      {Icon && <Icon />}
      {title}
    </Container>
  ) : (
    <Container {...rest}>
      {Icon && <Icon />}
      {title}
    </Container>
  )
}
