import { AtSign, FileText, Tool } from 'react-feather'

import imageCharges from '../../assets/Image Chargers.svg'
import { DashboardHeaderLink } from './DashboardHeaderLink'
import { Container, NavigationDashboard } from './styles'

export function DashboardHeader(): JSX.Element {
  return (
    <Container>
      <img src={imageCharges} />
      <NavigationDashboard>
        <DashboardHeaderLink
          icon={Tool}
          title="Gerenciamento de partes"
          description="Gerencie suas partes e subpartes."
          to="/parts"
        />
        <DashboardHeaderLink
          icon={FileText}
          title="Documentos e declarações"
          description="Gerencie seus documentos e declarações."
          to="/documents"
        />
        <DashboardHeaderLink
          icon={AtSign}
          title="Meus contatos"
          description="Adicione seus contatos."
          to="/contacts"
        />
      </NavigationDashboard>
    </Container>
  )
}
