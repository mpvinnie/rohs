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

  width: 100%;
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
    witdh: 50%;
    margin-top: 2rem;
  }
`

export const Header = styled.header`
  p {
    width: 70%;
  }

  img {
    width: 8rem;
    height: 8rem;

    margin: 0 auto;
  }

  a {
    align-self: flex-end;
    margin: 0.5rem 0 2.5rem;
    font-size: 0.875rem;
    color: var(--blue_500);
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
`

export const InputWrapper = styled.div`
  display: flex;
  margin-bottom: 2rem;

  div:nth-child(1) {
    margin-top: 1.5rem;
  }

  div:nth-child(2) {
    margin-left: 1.5rem;
  }
`

export const Details = styled.div`
  display: flex;
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
`
