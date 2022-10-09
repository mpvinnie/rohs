import { Root } from '@radix-ui/react-dialog'
import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'react-feather'
import { useParams } from 'react-router-dom'

import { Header } from '../../../components/Header'
import { NewSubpartModal } from '../../../components/Modals/NewSubpartModal'
import { PartStatus } from '../../../components/PartStatus'
import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import { SubpartFileLink } from '../../../components/SubpartFileLink'
import {
  CurrentTabOptions,
  SubpartHeaderNavigation
} from '../../../components/SubpartHeaderNavigation'
import { Table } from '../../../components/Table'
import { api } from '../../../services/api'
import {
  materialTypeNames,
  Part,
  PartWithSubparts,
  Review,
  Subpart
} from '../../../types/Provider'
import {
  ButtonTrigger,
  Container,
  Content,
  Main,
  NoRegistersContainer,
  PartDetailsContainer,
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
          materialTypeNames[subpart.material_type.name],
          <SubpartFileLink to={subpart.gwi4_11a1_url} key={subpart.id} />,
          <SubpartFileLink to={subpart.fispq_msds_url} key={subpart.id} />,
          <SubpartFileLink to={subpart.rohs_report_url} key={subpart.id} />,
          new Date(subpart.rohs_report_date).toLocaleDateString('pt-BR')
        ],
        redirectTo: '#'
      }
    })
  }, [subparts])

  return (
    <Container>
      <Sidebar selected={SidebarLinkTypes.PARTS} />
      <Root open={isModalOpened} onOpenChange={setIsModalOpened}>
        <Main>
          <Header
            title="Detalhes da parte"
            buttonTitle="Criar subparte"
            showButton={totalSubpartsCount > 0}
          />
          <NewSubpartModal setIsModalOpened={setIsModalOpened} part_id={id} />
          <Content>
            <PartDetailsContainer>
              <SubpartHeaderNavigation
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
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
              <h3>Subpartes</h3>
              {totalSubpartsCount > 0 ? (
                <Table
                  titles={[
                    'Nome',
                    'Tipo de Material',
                    'Gwi4 11a1',
                    'Fispq Msds',
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
                  <NewSubpartModal
                    setIsModalOpened={setIsModalOpened}
                    part_id={id}
                  />
                </NoRegistersContainer>
              )}
            </PartDetailsContainer>
          </Content>
        </Main>
      </Root>
    </Container>
  )
}
