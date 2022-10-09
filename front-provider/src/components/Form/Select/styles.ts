import styled, { css } from 'styled-components'

type ContainerProps = {
  isInvalid: boolean
  isFocused: boolean
}

export const Wrapper = styled.div`
  label {
    font-size: 0.875rem;
    display: block;
    margin-bottom: 0.5rem;
    color: var(--zinc-500);
  }
`

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

  select {
    flex: 1;
    border: 0;
    background: transparent;

    color: var(--white);

    option {
      background: var(--zinc-800);
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
