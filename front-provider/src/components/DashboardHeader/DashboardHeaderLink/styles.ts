import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled(Link)`
  width: 17rem;
  height: 14rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: var(--white);
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
  padding: 1rem;

  svg {
    color: var(--emerald-500);
    margin-bottom: 1.5rem;
  }

  span {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--blue_900);
    margin-bottom: 0.5rem;
    text-align: center;
  }

  p {
    font-size: 1rem;
    color: var(--purple_300);
    text-align: center;
  }

  @media (max-width: 1040px) {
    width: 16rem;

    span {
      margin-bottom: 0;
    }

    p {
      display: none;
    }
  }
`
