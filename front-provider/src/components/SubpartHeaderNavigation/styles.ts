import * as Dialog from '@radix-ui/react-dialog'
import styled, { css } from 'styled-components'

interface NavigationButtonProps {
  selected: boolean
}

export const Container = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;

  div {
    display: flex;

    a {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background: transparent;
      margin-right: 4rem;
      display: flex;
      align-items: center;
      justify-content: center;

      color: white;
      transition: background-color 0.2s;

      &:hover {
        background-color: var(--zinc-800);
      }
    }
  }
`

export const NavigationButton = styled.button<NavigationButtonProps>`
  background: none;
  padding: 0 2rem 0.25rem;
  color: var(--zinc-500);

  & + button {
    margin-left: 0.5rem;
  }

  ${(props) =>
    props.selected &&
    css`
      color: var(--white);
      border-bottom: 1px solid var(--emerald-500);
      font-weight: 600;
    `}
`

export const ButtonTrigger = styled(Dialog.Trigger)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  background: var(--emerald-500);
  color: var(--white);
  font-weight: 600;
  font-size: 1rem;
`
