import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import { Container, Content } from './styles'

export function Documents(): JSX.Element {
  return (
    <Container>
      <Sidebar selected={SidebarLinkTypes.DOCUMENTS} />
      <Content>
        <h1>Documents</h1>
      </Content>
    </Container>
  )
}
