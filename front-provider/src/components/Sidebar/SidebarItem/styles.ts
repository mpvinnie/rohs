import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

type Props = {
  is_selected: number
}

export const Container = styled(Link)<Props>`
  display: flex;
  align-items: center;
  color: var(--white);
  background: transparent;

  transition: filter 0.2s;

  svg {
    margin-right: 1.5rem;

    @media (max-width: 1080px) {
      margin-right: 0;
    }
  }

  span {
    @media (max-width: 1080px) {
      display: none;
    }
  }

  &:hover {
    filter: brightness(0.9);
  }

  ${(props) =>
    props.is_selected === 1 &&
    css`
      color: var(--emerald-500);
    `}

  @media (max-width: 1080px) {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
`

export const SelectionIndicator = styled.div<Props>`
  background: transparent;
  width: 0.25rem;
  height: 2rem;
  margin-right: 1.25rem;
  border-radius: 0 0.5rem 0.5rem 0;

  @media (max-width: 1080px) {
    display: none;
  }

  ${(props) =>
    props.is_selected &&
    css`
      background-color: var(--emerald-500);
    `}
`
