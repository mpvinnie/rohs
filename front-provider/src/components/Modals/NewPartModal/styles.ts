import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const Overlay = styled(Dialog.Overlay)`
  background: var(--gray_900_transparent);
  inset: 0;
  position: fixed;
`

export const Content = styled(Dialog.Content)`
  position: fixed;
  background: var(--white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  border-radius: 0.5rem;
  width: 30rem;
`
