import styled from 'styled-components'

export const Container = styled.div`
  background: var(--green_900);
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
  background: var(--white);
  padding: 2rem;
  width: 23rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;

  a {
    align-self: flex-end;
    margin: 0.5rem 0 2.5rem;
    font-size: 0.875rem;
    color: var(--blue_500);
    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`
