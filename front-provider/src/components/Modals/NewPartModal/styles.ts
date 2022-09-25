import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  background: var(--zinc-900-50);
  inset: 0;
  position: fixed;
`

export const Content = styled(Dialog.Content)`
  position: fixed;
  background: var(--zinc-800);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 0.5rem;
  width: 30rem;

  footer {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;

    button {
      height: 3rem;
      width: 7rem;
    }
  }
`

export const Title = styled(Dialog.Title)`
  margin-bottom: 1.5rem;
  font-weight: 700;
`

export const Close = styled(Dialog.Close)`
  background: var(--zinc-500);
  border-radius: 0.5rem;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
`
