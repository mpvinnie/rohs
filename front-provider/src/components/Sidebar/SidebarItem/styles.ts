import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

type ContainerProps = {
  is_selected: number
}

export const Container = styled(Link)<ContainerProps>`
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  color: var(--white);
  background: transparent;

  transition: filter 0.2s;

  @media (max-width: 1040px) {
    svg {
      margin-right: 0;
    }
  }

  svg {
    margin-right: 1rem;

    @media (max-width: 1040px) {
      margin-right: 0;
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  span {
    font-size: 1rem;

    @media (max-width: 1040px) {
      display: none;
    }
  }

  &:hover {
    filter: brightness(0.6);
  }

  ${(props) =>
    props.is_selected === 1 &&
    css`
      color: var(--emerald-500);
      font-weight: 700;
    `}
`
