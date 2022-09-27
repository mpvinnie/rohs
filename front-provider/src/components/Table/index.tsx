import { Root } from '@radix-ui/react-dropdown-menu'
import { MoreVertical } from 'react-feather'

import { PartStatus } from '../../types/Provider'
import { DropdownMenu } from '../DropdownMenu'
import { Container, Trigger } from './styles'

interface TableProps {
  titles: string[]
  data: {
    id: string
    render: (string | JSX.Element)[]
    redirectTo: string
    part_status?: PartStatus
  }[]
}

export function Table({ titles, data }: TableProps): JSX.Element {
  return (
    <Container>
      <thead>
        <tr>
          {titles.map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <Root key={item.id}>
            <tr>
              {item.render.map((line, index) => (
                <td key={index}>{line}</td>
              ))}
              <td>
                <Trigger>
                  <MoreVertical size={18} />
                </Trigger>
              </td>
              <DropdownMenu
                redirectTo={item.redirectTo}
                id={item.id}
                canEdit={
                  item.part_status === 'NOT_SENT' ||
                  item.part_status === 'DISAPPROVED' ||
                  item.part_status === 'EXPIRED'
                }
                canDelete={
                  item.part_status === 'NOT_SENT' ||
                  item.part_status === 'DISAPPROVED' ||
                  item.part_status === 'EXPIRED'
                }
              />
            </tr>
          </Root>
        ))}
      </tbody>
    </Container>
  )
}
