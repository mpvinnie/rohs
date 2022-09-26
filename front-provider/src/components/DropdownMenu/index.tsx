import { Activity, Edit, Trash } from 'react-feather'
import { Link } from 'react-router-dom'

import { Arrow, Content, Item, Portal } from './styles'

interface DropdownMenuProps {
  redirectTo: string
  id: string
}

export function DropdownMenu({
  redirectTo,
  id
}: DropdownMenuProps): JSX.Element {
  return (
    <Portal>
      <Content>
        <Link to={`${redirectTo}/${id}`}>
          Detalhes
          <Activity size={16} />
        </Link>
        <Item>
          Editar
          <Edit size={16} />
        </Item>
        <Item>
          Excluir
          <Trash size={16} />
        </Item>
        <Arrow />
      </Content>
    </Portal>
  )
}
