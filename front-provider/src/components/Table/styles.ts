import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import styled from 'styled-components'

export const Container = styled.table`
  width: 100%;
  margin: 2rem 0;

  border-radius: 0.5rem 0.5rem 0 0;
  border-collapse: collapse;
  overflow: hidden;

  thead {
    width: 100%;
    background: var(--zinc-800);
    color: var(--rose-500);
    margin-bottom: 0.5rem;

    tr {
      th {
        padding: 0.5rem 0.75rem;
        text-align: left;
        font-size: 0.875rem;
        font-weight: 600;
      }
    }
  }

  tbody {
    tr {
      td {
        max-width: 8rem;
        padding: 0.75rem;
        text-align: left;
        font-size: 0.875rem;
        font-weight: 400;
        color: var(--white);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        border-bottom: 1px solid var(--zinc-800);
      }
    }
  }
`

export const Trigger = styled(DropdownMenu.Trigger)`
  background: transparent;
  color: var(--zinc-500);
`
