import styled, { css } from 'styled-components'

interface ContainerProps {
  status:
    | 'DISAPPROVED'
    | 'UNDER_REVIEW'
    | 'APPROVED'
    | 'EXPIRED'
    | 'SENT_FOR_REVIEW'
    | 'NOT_SENT'
    | 'WAITING'
}

export const Container = styled.div<ContainerProps>`
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  width: fit-content;

  ${(props) =>
    props.status === 'DISAPPROVED' &&
    css`
      background: var(--red-500);
      color: var(--white);
    `};

  ${(props) =>
    props.status === 'APPROVED' &&
    css`
      background: var(--green-500);
      color: var(--white);
    `};

  ${(props) =>
    props.status === 'UNDER_REVIEW' &&
    css`
      background: var(--cyan-500);
      color: var(--white);
    `};

  ${(props) =>
    props.status === 'EXPIRED' &&
    css`
      background: var(--rose-500);
      color: var(--white);
    `};

  ${(props) =>
    props.status === 'SENT_FOR_REVIEW' &&
    css`
      background: var(--yellow-500);
      color: var(--white);
    `};

  ${(props) =>
    props.status === 'NOT_SENT' &&
    css`
      background: var(--zinc-800);
      color: var(--white);
    `};
`
