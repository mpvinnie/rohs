import { Icon } from 'react-feather'
import { LinkProps } from 'react-router-dom'

import { Container, SelectionIndicator } from './styles'

export enum SidebarLinkTypes {
  DASHBOARD = 'Dashboard',
  PARTS = 'Partes',
  DOCUMENTS = 'Documentos',
  CONTACTS = 'Contatos'
}

interface SidebarItemProps extends LinkProps {
  icon: Icon
  title: SidebarLinkTypes
  to: string
  isSelected: boolean
}

export function SidebarItem({
  icon: Icon,
  title,
  to,
  isSelected,
  ...rest
}: SidebarItemProps): JSX.Element {
  return (
    <Container to={to} is_selected={Number(isSelected)} {...rest}>
      <SelectionIndicator is_selected={Number(isSelected)} />
      <Icon size={16} />
      <span>{title}</span>
    </Container>
  )
}
