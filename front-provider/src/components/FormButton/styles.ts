import styled from 'styled-components'

export const Container = styled.button`
  width: 100%;
  height: 3.5rem;
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  background: var(--green_500);
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`
