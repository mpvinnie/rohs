import * as Dialog from '@radix-ui/react-dialog'
import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'sidebar main';
  grid-template-columns: minmax(15rem, 15rem) 1fr;

  @media (max-width: 1040px) {
    grid-template-columns: minmax(6rem, 6rem) 1fr;
  }

  height: 100vh;
`

export const Main = styled.main`
  grid-area: main;

  width: 100%;

  background: var(--gray_50);

  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Content = styled(Dialog.Root)`
  width: 100%;
  padding: 3.5rem;
  display: flex;
  justify-content: center;
`

export const PartsContainer = styled.div`
  background: var(--white);
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 70rem;
  box-shadow: 0px 8px 18px 1px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 1.5rem;
      color: var(--blue_900);
    }
  }
`

export const Button = styled(Dialog.Trigger)`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.2rem;
  background-color: var(--green_500);
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
`

export const Table = styled.table`
  width: 100%;
  margin: 2rem 0;

  border-collapse: collapse;

  thead {
    tr {
      th {
        border-bottom: 1px solid var(--gray_100);
        padding: 0.5rem;
        text-align: left;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--purple_300);
      }
    }
  }

  tbody {
    tr {
      td {
        border-bottom: 1px solid var(--gray_100);
        max-width: 8rem;
        padding: 1rem 0.5rem;
        text-align: left;
        font-size: 0.875rem;
        font-weight: 400;
        color: var(--blue_900);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        button {
          font-weight: 600;
          color: var(--blue_500);
          background: none;

          transition: filter 0.2s;

          &:hover {
            filter: brightness(0.9);
          }
        }
      }
    }
  }
`
