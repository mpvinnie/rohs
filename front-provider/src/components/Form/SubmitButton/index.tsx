import { ButtonHTMLAttributes } from 'react'
import ReactLoading from 'react-loading'

import { Container } from './styles'

interface ISubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting: boolean
  title: string
}

export function SubmitButton({
  isSubmitting,
  title,
  ...rest
}: ISubmitButtonProps): JSX.Element {
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
