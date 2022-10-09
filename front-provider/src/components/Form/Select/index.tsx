import {
  forwardRef,
  SelectHTMLAttributes,
  ForwardRefRenderFunction,
  useState
} from 'react'
import { FieldError } from 'react-hook-form'

import { Wrapper, Container, ErrorContainer, Error } from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label?: string
  error?: FieldError
  options: {
    value: string
    name: string
    disabled?: boolean | false
  }[]
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, error, label, options, ...rest },
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
        <select
          id={name}
          name={name}
          {...rest}
          ref={ref}
          onFocus={handleFocus}
          onBlur={handleBlur}
          defaultValue=""
        >
          {options.map((option) => (
            <option
              disabled={option.disabled}
              key={option.value}
              value={option.value}
            >
              {option.name}
            </option>
          ))}
        </select>
      </Container>
      <ErrorContainer>{error && <Error>{error.message}</Error>}</ErrorContainer>
    </Wrapper>
  )
}

export const Select = forwardRef(SelectBase)
