import styled, { css } from 'styled-components'

interface NavigationButtonProps {
  selected: boolean
}

export const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--zinc-800);

  a {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2rem;

    color: white;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--zinc-800);
    }
  }
`

export const NavigationButton = styled.button<NavigationButtonProps>`
  background: none;
  padding: 1rem 2rem;
  color: var(--zinc-500);

  & + button {
    margin-left: 0.5rem;
  }

  ${(props) =>
    props.selected &&
    css`
      color: var(--white);
      border-bottom: 2px solid var(--emerald-500);
      font-weight: 600;
    `}
`
