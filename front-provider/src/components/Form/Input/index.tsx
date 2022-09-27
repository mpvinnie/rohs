import {
  forwardRef,
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  useState
} from 'react'
import { FieldError } from 'react-hook-form'

import { Container, ErrorContainer, Error, Wrapper } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error, label, ...rest },
  ref
): JSX.Element => {
  const [isFocused, setIsFocused] = useState(false)

  function handleFocus() {
    setIsFocused(true)
  }

  function handleBlur() {
    setIsFocused(false)
  }

  return (
    <Wrapper>
      <label htmlFor={name}>{label}</label>
      <Container isInvalid={!!error} isFocused={isFocused}>
        <input
          id={name}
          name={name}
          {...rest}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Container>
      <ErrorContainer>{error && <Error>{error.message}</Error>}</ErrorContainer>
    </Wrapper>
  )
}

export const Input = forwardRef(InputBase)
