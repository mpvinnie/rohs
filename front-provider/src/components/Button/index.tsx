import { ButtonHTMLAttributes } from 'react'
import { Icon } from 'react-feather'

import { Container, ButtonTrigger } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: Icon
  title: string
  isButtonTrigger?: boolean
}

export function Button({
  icon: Icon,
  title,
  isButtonTrigger = false,
  ...rest
}: ButtonProps): JSX.Element {
  return isButtonTrigger ? (
    <ButtonTrigger {...rest}>
      {Icon && <Icon />}
      {title}
    </ButtonTrigger>
  ) : (
    <Container {...rest}>
      {Icon && <Icon />}
      {title}
    </Container>
  )
}
