import styled, { css } from 'styled-components'

type ButtonOptionsProps = {
  option: 'edit' | 'delete'
}

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

export const Content = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const PathLinks = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 70rem;

  span {
    color: var(--blue_500);
    font-weight: 600;
    font-size: 1rem;
  }
`

export const ContactsContainer = styled.div`
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
      }
    }
  }
`

export const ButtonOptions = styled.button<ButtonOptionsProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3rem;
  border-radius: 50%;
  color: var(--white);

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }

  ${(props) =>
    props.option === 'edit' &&
    css`
      background: var(--blue_500);
    `}

  ${(props) =>
    props.option === 'delete' &&
    css`
      background: var(--red_500);
    `}
`
