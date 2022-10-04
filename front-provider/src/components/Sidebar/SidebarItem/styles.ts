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
    margin-right: 1.714rem;
  }

  span {
    font-size: 1rem;

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
  }
`

export const SelectionIndicator = styled.div<Props>`
  background: transparent;
  width: 0.285rem;
  height: 2.285rem;
  margin-right: 1.428rem;
  border-radius: 0 0.571rem 0.571rem 0;

  ${(props) =>
    props.is_selected &&
    css`
      background-color: var(--emerald-500);
    `}

  @media (max-width: 1080px) {
    background: transparent;
  }
`
