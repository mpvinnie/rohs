import { ButtonHTMLAttributes } from 'react'

import { Container } from './styles'

interface PaginationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  number: number
  isCurrent?: boolean
  onPageChange: (page: number) => void
}

export function PaginationItem({
  number,
  isCurrent = false,
  onPageChange,
  ...rest
}: PaginationItemProps): JSX.Element {
  return (
    <Container
      isCurrent={isCurrent}
      onClick={() => onPageChange(number)}
      {...rest}
    >
      {number}
    </Container>
  )
}
