import styled, { css } from 'styled-components'

type ContainerProps = {
  isInvalid: boolean
  isFocused: boolean
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  padding: 0.5rem 1rem;

  display: flex;
  align-items: center;

  border: 2px solid var(--zinc-900);
  border-radius: 0.5rem;

  background: var(--zinc-900);

  ${(props) =>
    props.isInvalid &&
    css`
      border-color: var(--rose-600);
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: var(--emerald-500);
    `}

  div + & {
    margin-top: 0.5rem;
  }

  textarea {
    flex: 1;
    border: 0;
    background: transparent;
    resize: none;

    color: var(--white);
    font-size: 1rem;

    &::placeholder {
      color: var(--zinc-500);
    }
  }
`

export const ErrorContainer = styled.div`
  height: 0.875rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.3rem;
`

export const Error = styled.span`
  font-size: 0.6rem;
  color: var(--rose-600);
`
