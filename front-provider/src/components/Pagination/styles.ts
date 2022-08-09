import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: var(--blue_900);
`

export const PaginationItemsContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  span {
    width: 2.5rem;
    color: var(--blue_900);
    text-align: center;
    font-size: 1rem;
  }
`
