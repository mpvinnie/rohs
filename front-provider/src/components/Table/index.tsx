import { Root } from '@radix-ui/react-dropdown-menu'
import { Linkedin, MoreVertical } from 'react-feather'

import { DropdownMenu } from '../DropdownMenu'
import { Container, Trigger } from './styles'

interface TableProps {
  titles: string[]
  data: {
    id: string
    render: (string | JSX.Element)[]
    redirectTo: string
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
              <DropdownMenu redirectTo={item.redirectTo} id={item.id} />
            </tr>
          </Root>
        ))}
      </tbody>
    </Container>
  )
}
