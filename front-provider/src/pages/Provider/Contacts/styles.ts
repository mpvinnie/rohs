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

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
`

export const Content = styled(Dialog.Root)`
  width: 100%;
  padding: 3.5rem;
  display: flex;
  justify-content: center;
`

export const ContactsContainer = styled.div`
  width: 100%;
  max-width: 70rem;
  height: 100%;

  display: flex;
  flex-direction: column;

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-weight: 900;
    }

    button {
      margin-top: 0.5rem;
    }
  }
`

export const ButtonTrigger = styled(Dialog.Trigger)`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.2rem;
  background-color: var(--emerald-500);
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
`

export const NoRegistersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    display: block;
    margin-bottom: 1rem;
    color: var(--zinc-500);
  }
`
