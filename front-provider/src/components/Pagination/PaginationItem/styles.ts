import styled, { css } from 'styled-components'

type ContainerProps = {
  isCurrent: boolean
}

export const Container = styled.button<ContainerProps>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;

  background: var(--zinc-800);
  color: var(--zinc-500);

  transition: filter 0.2s;

  ${(props) =>
    props.isCurrent &&
    css`
      background: var(--emerald-500);
      color: var(--white);
      font-weight: 600;
    `}

  &:hover {
    filter: brightness(0.9);
  }
`
