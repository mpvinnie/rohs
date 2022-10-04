import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'react-feather'
import { useParams } from 'react-router-dom'

import { Header } from '../../../components/Header'
import { NewPartModal } from '../../../components/Modals/NewPartModal'
import { Pagination } from '../../../components/Pagination'
import { PartStatus } from '../../../components/PartStatus'
import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import {
  CurrentTabOptions,
  SubpartHeaderNavigation
} from '../../../components/SubpartHeaderNavigation'
import { Table } from '../../../components/Table'
import { api } from '../../../services/api'
import {
  Part,
  PartWithSubparts,
  Review,
  Subpart
} from '../../../types/Provider'
import {
  Container,
  Main,
  Content,
  PartDetailsContainer,
  ButtonTrigger,
  NoRegistersContainer,
  PartDetailsContent
} from './styles'

interface UrlParams {
  id: string
}

export function PartDetails(): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [part, setPart] = useState<Part>({} as Part)
  const [reviews, setReviews] = useState<Review[]>([])
  const [subparts, setSubparts] = useState<Subpart[]>([])
  const [totalSubpartsCount, setTotalSubpartsCount] = useState(0)
  const [currentTab, setCurrentTab] = useState<CurrentTabOptions>('details')

  const { id } = useParams<UrlParams>()

  useEffect(() => {
    async function loadPartWithSubparts() {
      const response = await api.get<PartWithSubparts>(`/providers/parts/${id}`)
      const partWithSubparts = response.data

      const partData = {
        id: partWithSubparts.id,
        provider_id: partWithSubparts.provider_id,
        code: partWithSubparts.code,
        description: partWithSubparts.description,
        status: partWithSubparts.status,
        comment: partWithSubparts.comment,
        created_at: partWithSubparts.created_at
      }

      setPart(partData)
      setReviews(partWithSubparts.reviews)
      setSubparts(partWithSubparts.subparts)

      setTotalSubpartsCount(partWithSubparts._count_subparts)
    }

    loadPartWithSubparts()
  }, [id])

  const subpartTableData = useMemo(() => {
    return subparts.map((subpart) => {
      return {
        id: subpart.id,
        render: [
          subpart.name,
          subpart.material_type.name,
          subpart.gwi4_11a1,
          subpart.fispq_msds,
          subpart.rohs_report,
          new Date(subpart.rohs_report_date).toLocaleDateString('pt-BR')
        ],
        redirectTo: '#'
      }
    })
  }, [subparts])

  return (
    <Container>
      <Sidebar selected={SidebarLinkTypes.PARTS} />
      <Main>
        <Header title="Detalhes da parte" />
        <Content open={isModalOpened} onOpenChange={setIsModalOpened}>
          <PartDetailsContainer>
            <SubpartHeaderNavigation
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
              showAddSupartButton={totalSubpartsCount > 0}
            />
            <PartDetailsContent>
              <header>
                <div>
                  <label htmlFor="code">Code</label>
                  <span id="code">{part.code}</span>
                </div>
                <div>
                  <label htmlFor="status">Status</label>
                  <PartStatus id="status" status={part.status} />
                </div>
              </header>
              <label htmlFor="description">Descrição</label>
              <span id="description">{part.description}</span>

              {!!part.comment && (
                <>
                  <label htmlFor="comment">Comentário</label>
                  <span id="comment">{part.comment}</span>
                </>
              )}
            </PartDetailsContent>
            {totalSubpartsCount > 0 ? (
              <Table
                titles={[
                  'Nome',
                  'Tipo de Material',
                  'Gwi4 11a1',
                  'Dispq Msds',
                  'Rosh Report',
                  'Data Report',
                  ''
                ]}
                data={subpartTableData}
              />
            ) : (
              <NoRegistersContainer>
                <span>Nenhum registro encontrado</span>
                <ButtonTrigger>
                  <Plus size={24} />
                  Criar nova subparte
                </ButtonTrigger>
                <NewPartModal setIsModalOpened={setIsModalOpened} />
              </NoRegistersContainer>
            )}
          </PartDetailsContainer>
        </Content>
      </Main>
    </Container>
  )
}
