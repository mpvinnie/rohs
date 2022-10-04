import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  padding: 3rem;

  background: var(--gray_50);
`

export const Content = styled.main`
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;

  a {
    display: flex;
    align-items: center;
    color: var(--gray_500);
  }
`

export const PathLinks = styled.div`
  display: flex;
  align-items: center;

  a {
    color: var(--gray_500);
    margin-right: 0.5rem;
  }

  span {
    display: inline-block;
    margin-right: 0.5rem;
    font-size: 1.5rem;
    color: var(--gray_500);
  }

  strong {
    color: var(--emerald-500);
  }
`

export const NewContactFormContainer = styled.form`
  padding: 2.5rem 2rem;
  background: var(--white);
  border-radius: 1rem;

  h2 {
    margin-bottom: 1.5rem;
  }

  button {
    margin-top: 2rem;
  }
`
