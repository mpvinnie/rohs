import { MoreVertical } from 'react-feather'
import { Link } from 'react-router-dom'

import { Container } from './styles'

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
          <tr key={item.id}>
            {item.render.map((line, index) => (
              <td key={index}>{line}</td>
            ))}
            <td>
              <Link to={`${item.redirectTo}/${item.id}`}>
                <MoreVertical size={18} />
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Container>
  )
}
