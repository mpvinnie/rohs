import styled from 'styled-components'

export const Container = styled.div`
  background: var(--green_900);
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin: 1.5rem 0 1rem 0;
  }
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 100vw;
  max-width: 70rem;
  padding: 2rem;

  background: var(--white);

  border-radius: 1rem;
  box-shadow: 0px 8px 18px 1px rgba(0, 0, 0, 0.25);

  h3 {
    margin-bottom: 1rem;
    font-size: 23px;
  }

  button {
    justify-content: center;
    margin: 0 auto;
    width: 50rem;
    height: 3rem;
    background-color: var(--blue_500);
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;

  p {
    width: 70%;
    text-align: center;
  }

  img {
    width: 6rem;
    height: 6rem;

    margin: 0 auto;
  }
`

export const Details = styled.div`
  display: flex;
  flex: wrap;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 1rem;

  h4 {
    color: var(--emerald-500);
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    flex-direction: column;

    label {
      color: var(--gray_500);
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
        text-align: center;
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
        text-align: center;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--blue_900);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        select {
          width: 100%;
          height: 2rem;
          text-align: center;
          font-size: 0.85rem;
          font-weight: 400;

          border-radius: 1rem;
          border: 0 transparent solid;

          box-shadow: 0px 2px 5px 1px rgba(0, 0, 0, 0.25);
        }
      }
    }
  }

  a {
    align-self: flex-end;
    margin: 0.5rem 0 2.5rem;
    font-size: 0.875rem;
    color: var(--blue_500);
    transition: filter 0.2s;

    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }
`
