import { useEffect, useState } from 'react'
import { Plus } from 'react-feather'
import { useHistory } from 'react-router-dom'

import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'
import { Pagination } from '../../../components/Pagination'
import { PartStatus } from '../../../components/PartStatus'
import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import { useAuth } from '../../../hooks/AuthContext'
import { api } from '../../../services/api'
import { Part } from '../../../types/Provider'
import { Container, Main, Content, PartsContainer, Table } from './styles'

export function Parts(): JSX.Element {
  const [parts, setParts] = useState<Part[]>([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const { provider } = useAuth()

  const { push } = useHistory()

  useEffect(() => {
    async function loadParts() {
      const response = await api.get<Part[]>(
        `/parts/${provider.id}?page=${page}&per_page=10`
      )

      const serializedParts = response.data.map((part) => {
        return {
          id: part.id,
          provider_id: part.provider_id,
          part_code: part.part_code,
          description: part.description,
          status: part.status,
          is_active: part.is_active,
          comment: part.comment,
          is_blocked: part.is_blocked,
          created_at: new Date(part.created_at).toLocaleDateString('pt-BR'),
          disapproval_reasons: part.disapproval_reasons
        }
      })
      setParts(serializedParts)
      setTotalCount(Number(response.headers['x-total-count']))
    }

    loadParts()
  }, [page, provider.id])

  console.log(parts)

  return (
    <Container>
      <Sidebar selected={SidebarLinkTypes.PARTS} />
      <Main>
        <Header />
        <Content>
          <PartsContainer>
            <header>
              <h3>Partes</h3>
              <Button icon={Plus} title="Criar nova" />
            </header>
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
                      <td>{part.part_code}</td>
                      <td>{part.description}</td>
                      <td>{part.created_at}</td>
                      <td>
                        <PartStatus status={part.status} />
                      </td>
                      <td>
                        <button
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
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>Nenhuma parte encontrada</p>
                )}
              </tbody>
            </Table>

            <Pagination
              totalCountOfRegisters={totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </PartsContainer>
        </Content>
      </Main>
    </Container>
  )
}
