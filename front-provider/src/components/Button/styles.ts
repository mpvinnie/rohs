import { Trigger } from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const Container = styled.button`
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.25rem;
  color: var(--white);
  background: var(--emerald-500);

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  font-size: 1rem;
  font-weight: 600;
`

export const ButtonTrigger = styled(Trigger)`
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.25rem;
  color: var(--white);
  background: var(--emerald-500);

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  font-size: 1rem;
  font-weight: 600;
`
