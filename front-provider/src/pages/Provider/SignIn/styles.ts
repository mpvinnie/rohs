import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-bottom: 2.5rem;
  }
`

export const Form = styled.form`
  background: var(--zinc-800);
  padding: 2rem;
  width: 23rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;

  button {
    margin-top: 1.5rem;
  }

  a {
    align-self: center;
    margin: 1rem 0;
    font-size: 0.875rem;
    color: var(--purple-500);
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`
