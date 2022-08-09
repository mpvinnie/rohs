import styled, { css } from 'styled-components'

type ContainerProps = {
  isInvalid: boolean
  isFocused: boolean
}

export const Container = styled.div<ContainerProps>`
  width: 100%;

  display: flex;
  flex-direction: column;

  border-bottom: 2px solid var(--gray_100);

  ${(props) =>
    props.isInvalid &&
    css`
      border-color: var(--red_500);
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: var(--green_500);
    `}

  div + & {
    margin-top: 1.5rem;
  }

  label {
    font-size: 1rem;
    font-weight: 500;
    color: var(--gray_500);
  }

  input {
    border: 0;
    padding: 0.125rem 0 0.5rem;

    color: var(--green_500);
    font-size: 1rem;

    &::placeholder {
      color: var(--gray_100);
    }
  }
`

export const Error = styled.span`
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--red_500);
`
