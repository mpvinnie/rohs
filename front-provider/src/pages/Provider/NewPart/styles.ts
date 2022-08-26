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
  background: var(--white);
  padding: 2rem;
  width: 100vh;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  }

  button {
    witdh: 50%;
    margin: 10px;
  }
`

export const Header = styled.header`
h3 {
    margin-bottom: 1rem;
    font-size: 23px;
  }

  input {
    width: 50%;
    margin: 0 1rem 1rem 0;
  }

  input:nth-child(2) {
    width: 30%;
  }

  p {
    width: 70%;
  }

  img {
    width: 8rem;
    height: 8rem;
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
