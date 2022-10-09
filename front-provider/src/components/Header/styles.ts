import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 3.5rem;
`

export const HeaderContent = styled.div`
  width: 100%;
  max-width: 70rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-weight: 700;
  }
`

export const InteractionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  & > svg {
    color: var(--zinc-500);
  }
`
