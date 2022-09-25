import {
  forwardRef,
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  useState
} from 'react'
import { FieldError } from 'react-hook-form'

import { Container, ErrorContainer, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, error, ...rest },
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
    <>
      <Container isInvalid={!!error} isFocused={isFocused}>
        <input
          name={name}
          {...rest}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Container>
      <ErrorContainer>{error && <Error>{error.message}</Error>}</ErrorContainer>
    </>
  )
}

export const Input = forwardRef(InputBase)
