import { ButtonHTMLAttributes } from 'react'
import ReactLoading from 'react-loading'

import { Container } from './styles'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean
  title: string
}

export function FormButton({
  isSubmitting,
  title,
  ...rest
}: IButtonProps): JSX.Element {
  return (
    <Container disabled={isSubmitting} {...rest}>
      {isSubmitting ? (
        <ReactLoading type="bubbles" height={32} width={32} />
      ) : (
        title
      )}
    </Container>
  )
}
