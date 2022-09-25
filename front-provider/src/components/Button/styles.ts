import styled from 'styled-components'

export const Container = styled.button`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.5rem;
  color: var(--white);
  background: var(--emerald-500);

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  svg {
    margin-right: 0.5rem;
  }

  font-size: 1rem;
  font-weight: 600;
`
