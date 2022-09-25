import {
  forwardRef,
  ForwardRefRenderFunction,
  useState,
  TextareaHTMLAttributes
} from 'react'
import { FieldError } from 'react-hook-form'

import { Container, ErrorContainer, Error } from './styles'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  error?: FieldError
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ name, error, ...rest }, ref): JSX.Element => {
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
        <textarea
          name={name}
          {...rest}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rows={5}
        />
      </Container>
      <ErrorContainer>{error && <Error>{error.message}</Error>}</ErrorContainer>
    </>
  )
}

export const Textarea = forwardRef(TextareaBase)
