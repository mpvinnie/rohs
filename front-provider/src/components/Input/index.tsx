import {
  forwardRef,
  InputHTMLAttributes,
  ForwardRefRenderFunction,
  useState
} from 'react'
import { FieldError } from 'react-hook-form'

import { Container, Error } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  error?: FieldError
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error, ...rest },
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
        {label && <label htmlFor={name}>{label}</label>}
        <input
          name={name}
          {...rest}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Container>
      {error && <Error>{error.message}</Error>}
    </>
  )
}

export const Input = forwardRef(InputBase)
