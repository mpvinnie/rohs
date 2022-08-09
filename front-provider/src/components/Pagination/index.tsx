import { PaginationItem } from './PaginationItem'
import { Container, PaginationItemsContainer } from './styles'

interface PaginationsProps {
  totalCountOfRegisters: number
  registersPerPage?: number
  currentPage?: number
  onPageChange: (page: number) => void
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationsProps): JSX.Element {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)
  const firstItemIndexPage = (currentPage - 1) * registersPerPage + 1
  const lastItemIndexPage =
    currentPage === lastPage
      ? totalCountOfRegisters
      : currentPage * registersPerPage

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : []

  return (
    <Container>
      <div>
        <strong>{firstItemIndexPage}</strong> -{' '}
        <strong>{lastItemIndexPage}</strong> de{' '}
        <strong>{totalCountOfRegisters}</strong>
      </div>

      <PaginationItemsContainer>
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && <span>...</span>}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        <PaginationItem
          onPageChange={onPageChange}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && <span>...</span>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </PaginationItemsContainer>
    </Container>
  )
}
