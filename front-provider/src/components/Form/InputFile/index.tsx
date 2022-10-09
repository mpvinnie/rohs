import {
  forwardRef,
  InputHTMLAttributes,
  ForwardRefRenderFunction
} from 'react'
import { Icon } from 'react-feather'
import { FieldError } from 'react-hook-form'

import { Container, ErrorContainer, Error, Wrapper } from './styles'

interface InputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  icon?: Icon
  label?: string
  error?: FieldError
}

const InputFileBase: ForwardRefRenderFunction<
  HTMLInputElement,
  InputFileProps
> = ({ name, icon: Icon, error, label, ...rest }, ref): JSX.Element => {
  return (
    <Wrapper>
      <label htmlFor={name}>{label}</label>
      <Container isInvalid={!!error}>
        <input id={name} name={name} {...rest} type="file" ref={ref} />
        {Icon && <Icon size={16} />}
      </Container>
      <ErrorContainer>{error && <Error>{error.message}</Error>}</ErrorContainer>
    </Wrapper>
  )
}

export const InputFile = forwardRef(InputFileBase)
