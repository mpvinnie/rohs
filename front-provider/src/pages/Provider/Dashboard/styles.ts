import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'sidebar main';
  grid-template-columns: minmax(15rem, 15rem) 1fr;

  @media (max-width: 1080px) {
    grid-template-columns: minmax(6rem, 6rem) 1fr;
  }

  height: 100vh;
`

export const Content = styled.div`
  background: var(--white);
  grid-area: main;
  width: 100%;
`

export const Main = styled.main`
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
`

export const ChartsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: 68rem;
  gap: 1rem;

  margin-top: 2rem;

  @media (max-width: 1080px) {
    flex-direction: column;
  }
`
