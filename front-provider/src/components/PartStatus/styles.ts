import styled, { css } from 'styled-components'

interface ContainerProps {
  status: 'disapproved' | 'waiting' | 'approved'
}

export const Container = styled.div<ContainerProps>`
  padding: 0.25rem;
  width: min-content;
  border-radius: 0.5rem;
  font-weight: 600;

  ${(props) =>
    props.status === 'disapproved' &&
    css`
      background: var(--red_300);
      color: var(--red_500);
    `};

  ${(props) =>
    props.status === 'approved' &&
    css`
      background: var(--green_300);
      color: var(--green_500);
    `};
  ${(props) =>
    props.status === 'waiting' &&
    css`
      background: var(--blue_300);
      color: var(--blue_500);
    `};
`
