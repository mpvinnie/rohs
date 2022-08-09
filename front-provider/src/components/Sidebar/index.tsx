import { AtSign, FileText, Grid, Settings, Tool } from 'react-feather'

import logoImg from '../../assets/logo.svg'
import { SidebarItem, SidebarLinkTypes } from './SidebarItem'
import { Container, LogoContainer, NavigationLinks, Footer } from './styles'

interface SidebarProps {
  selected: SidebarLinkTypes
}

export function Sidebar({ selected }: SidebarProps): JSX.Element {
  return (
    <Container>
      <LogoContainer>
        <img src={logoImg} alt="RoHS" />
      </LogoContainer>
      <NavigationLinks>
        <SidebarItem
          icon={Grid}
          title={SidebarLinkTypes.DASHBOARD}
          isSelected={selected === SidebarLinkTypes.DASHBOARD}
          to="/dashboard"
        />
        <SidebarItem
          icon={Tool}
          title={SidebarLinkTypes.PARTS}
          isSelected={selected === SidebarLinkTypes.PARTS}
          to="/parts"
        />
        <SidebarItem
          icon={FileText}
          title={SidebarLinkTypes.DOCUMENTS}
          to="/documents"
          isSelected={selected === SidebarLinkTypes.DOCUMENTS}
        />
        <SidebarItem
          icon={AtSign}
          title={SidebarLinkTypes.CONTACTS}
          to="/contacts"
          isSelected={selected === SidebarLinkTypes.CONTACTS}
        />
      </NavigationLinks>
      <Footer to="/settings">
        <Settings />
        <span>Configurações</span>
      </Footer>
    </Container>
  )
}
