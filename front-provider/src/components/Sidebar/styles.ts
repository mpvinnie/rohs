import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.aside`
  grid-area: sidebar;

  width: 100%;
  background: var(--green_900);
  display: flex;
  flex-direction: column;
`

export const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem auto;

  img {
    width: 4rem;
  }
`

export const NavigationLinks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const Footer = styled(Link)`
  width: 100%;
  height: 3.5rem;
  background: var(--green_700);

  padding: 0.5rem 2rem;

  display: flex;
  align-items: center;
  color: var(--white);

  transition: filter 0.2s;

  svg {
    margin-right: 1rem;

    @media (max-width: 1040px) {
      margin-right: 0;
    }
  }

  span {
    font-size: 1rem;

    @media (max-width: 1040px) {
      display: none;
    }
  }

  &:hover {
    filter: brightness(0.8);
  }
`
