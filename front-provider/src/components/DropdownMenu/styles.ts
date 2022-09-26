import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'

export const Portal = styled(DropdownMenu.Portal)``

export const Arrow = styled(DropdownMenu.Arrow)`
  fill: var(--white);
`

export const Content = styled(DropdownMenu.Content)`
  min-width: 12rem;
  background: var(--white);
  border-radius: 0.3rem;
  padding: 0.2rem;

  display: flex;
  flex-direction: column;
  justify-content: center;

  a {
    background: var(--white);
    font-size: 0.8125rem;
    color: var(--rose-500);
    border-radius: 3px;
    font-weight: 500;

    display: flex;
    justify-content: space-between;
    padding: 0.3rem 1rem;

    &:hover {
      background-color: var(--rose-600);
      color: var(--white);

      svg {
        color: var(--white);
      }
    }

    svg {
      color: var(--zinc-500);
    }
  }
`

export const Item = styled.button`
  background: var(--white);
  font-size: 0.8125rem;
  color: var(--rose-500);
  border-radius: 3px;
  font-weight: 500;

  display: flex;
  justify-content: space-between;
  padding: 0.3rem 1rem;

  &:hover {
    background-color: var(--rose-600);
    color: var(--white);

    svg {
      color: var(--white);
    }
  }

  svg {
    color: var(--zinc-500);
  }
`
