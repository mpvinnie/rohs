import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'sidebar main';
  grid-template-columns: minmax(15rem, 15rem) 1fr;

  @media (max-width: 1040px) {
    grid-template-columns: minmax(6rem, 6rem) 1fr;
  }
`

export const Content = styled.main`
  background: var(--white);
  height: 100vh;
  width: 100%;

  grid-area: main;
`
