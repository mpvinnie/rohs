import { useEffect, useState } from 'react'
import { Plus } from 'react-feather'

import { Header } from '../../../components/Header'
import { NewPartModal } from '../../../components/Modals/NewPartModal'
import { PartStatus } from '../../../components/PartStatus'
import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import { api } from '../../../services/api'
import { Part } from '../../../types/Provider'
import {
  Container,
  Main,
  Content,
  PartsContainer,
  Table,
  ButtonTrigger,
  NoRegistersContainer
} from './styles'

export function Parts(): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [parts, setParts] = useState<Part[]>([])
  // const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  // const { provider } = useAuth()

  useEffect(() => {
    async function loadParts() {
      const response = await api.get<Part[]>(`/providers/parts`)

      const serializedParts = response.data.map((part) => {
        return {
          id: part.id,
          provider_id: part.provider_id,
          code: part.code,
          description: part.description,
          status: part.status,
          comment: part.comment,
          created_at: new Date(part.created_at).toLocaleDateString('pt-BR')
        }
      })
      setParts(serializedParts)
      // setTotalCount(Number(response.headers['x-total-count']))
      setTotalCount(Number(parts.length))
    }

    loadParts()
  }, [parts.length])

  return (
    <Container>
      <Sidebar selected={SidebarLinkTypes.PARTS} />
      <Main>
        <Header />
        <Content open={isModalOpened} onOpenChange={setIsModalOpened}>
          <PartsContainer>
            <header>
              <h1>Partes</h1>
              {totalCount > 0 && (
                <ButtonTrigger>
                  <Plus size={24} />
                  Criar nova
                </ButtonTrigger>
              )}
              <NewPartModal setIsModalOpened={setIsModalOpened} />
            </header>
            {totalCount > 0 ? (
              <>
                <Table>
                  <thead>
                    <tr>
                      <th>Part Code</th>
                      <th>Descrição</th>
                      <th>Submit Date</th>
                      <th>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts ? (
                      parts.map((part) => (
                        <tr key={part.id}>
                          <td>{part.code}</td>
                          <td>{part.description}</td>
                          <td>{part.created_at}</td>
                          <td>
                            <PartStatus status="DISAPPROVED" />
                          </td>
                          <td>
                            {/* <button
                            onClick={() =>
                              push(`/parts/subparts/${part.id}`, {
                                part_code: part.part_code,
                                disapproval_reason:
                                  part.disapproval_reasons.length > 0
                                    ? part.disapproval_reasons[0].message
                                    : null,
                                status: part.status
                              })
                            }
                          >
                            Detalhes
                          </button> */}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <p>Nenhuma parte encontrada</p>
                    )}
                  </tbody>
                </Table>

                {/* <Pagination
                      totalCountOfRegisters={totalCount}
                      currentPage={page}
                      onPageChange={setPage}
                    />
                */}
              </>
            ) : (
              <NoRegistersContainer>
                <span>Nenhum registro encontrado</span>
                <ButtonTrigger>
                  <Plus size={24} />
                  Criar nova parte
                </ButtonTrigger>
                <NewPartModal setIsModalOpened={setIsModalOpened} />
              </NoRegistersContainer>
            )}
          </PartsContainer>
        </Content>
      </Main>
    </Container>
  )
}
