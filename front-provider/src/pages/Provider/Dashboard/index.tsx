import { Chart as MyChart } from '../../../components/Chart'
import { DashboardHeader } from '../../../components/DashboardHeader'
import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import { Container, Content, Main, ChartsContainer } from './styles'

export function Dashboard(): JSX.Element {
  const data = [30, 40, 45, 50, 49, 60, 70]
  const days = [
    new Date('2021-08-31').toDateString(),
    new Date('2021-09-01').toDateString(),
    new Date('2021-09-02').toDateString(),
    new Date('2021-09-03').toDateString(),
    new Date('2021-09-04').toDateString(),
    new Date('2021-09-05').toDateString(),
    new Date('2021-09-06').toDateString()
  ]

  return (
    <>
      <Container>
        <Sidebar selected={SidebarLinkTypes.DASHBOARD} />
        <Content>
          <DashboardHeader />
          <Main>
            <ChartsContainer>
              <MyChart
                title="Partes adicionadas semanalmente"
                data={data}
                days={days}
              />
              <MyChart
                title="Documentos adicionados semanalmente"
                data={data}
                days={days}
              />
            </ChartsContainer>
          </Main>
        </Content>
      </Container>
    </>
  )
}
