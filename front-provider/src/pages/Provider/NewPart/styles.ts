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
  width: 100%;
  background: var(--white);
  padding: 2rem;
  border-radius: 1rem;

  h3 {
    margin-bottom: 1rem;
    font-size: 23px;
  }

  button {
    witdh: 50%;
    margin: 10px;
  }
`

export const Header = styled.header`
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

export const InputWrapper = styled.div`
  label {
    font-size: 11px;
  }

  input {
    width: 30%;
    height: 3rem;
    border-radius: 10px 10px;
  }

  input:nth-child(2) {
    width: 60%;
    margin-left: 1rem;
  }
`

export const Details = styled.div`
  display: flex;
`
