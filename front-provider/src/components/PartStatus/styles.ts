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
  padding: 0.25rem;
  width: min-content;
  border-radius: 0.5rem;
  font-weight: 600;

  ${(props) =>
    props.status === 'DISAPPROVED' &&
    css`
      background: var(--red_300);
      color: var(--red_500);
    `};

  ${(props) =>
    props.status === 'APPROVED' &&
    css`
      background: var(--green_300);
      color: var(--green_500);
    `};

  ${(props) =>
    props.status === 'UNDER_REVIEW' &&
    css`
      background: var(--blue_300);
      color: var(--blue_500);
    `};

  ${(props) =>
    props.status === 'EXPIRED' &&
    css`
      background: var(--red_200);
      color: var(--red_50);
    `};

  ${(props) =>
    props.status === 'SENT_FOR_REVIEW' &&
    css`
      background: var(--purple_200);
      color: var(--purple_600);
    `};

  ${(props) =>
    props.status === 'NOT_SENT' &&
    css`
      background: var(--gray_50);
      color: var(--gray_400);
    `};

  ${(props) =>
    props.status === 'WAITING' &&
    css`
      background: var(--blue_300);
      color: var(--blue_500);
    `};
`
