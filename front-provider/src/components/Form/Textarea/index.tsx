import {
  forwardRef,
  ForwardRefRenderFunction,
  useState,
  TextareaHTMLAttributes
} from 'react'
import { FieldError } from 'react-hook-form'

import { Container, ErrorContainer, Error, Wrapper } from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  label?: string
  error?: FieldError
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ name, error, label, ...rest }, ref): JSX.Element => {
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
        <textarea
          id={name}
          name={name}
          {...rest}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={5}
        />
      </Container>
      <ErrorContainer>{error && <Error>{error.message}</Error>}</ErrorContainer>
    </Wrapper>
  )
}

export const Textarea = forwardRef(TextareaBase)
