import { Root } from '@radix-ui/react-dialog'
import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'react-feather'

import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'
import { NewPartModal } from '../../../components/Modals/NewPartModal'
import { Pagination } from '../../../components/Pagination'
import { PartStatus } from '../../../components/PartStatus'
import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import { Table } from '../../../components/Table'
import { api } from '../../../services/api'
import { Part } from '../../../types/Provider'
import {
  Container,
  Main,
  Content,
  PartsContainer,
  NoRegistersContainer
} from './styles'

interface IPart {
  parts: Part[]
  _count: number
}

export function Parts(): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [parts, setParts] = useState<Part[]>([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function loadParts() {
      const response = await api.get<IPart>(
        `/providers/parts?page=${page}&per_page=10`
      )
      const { parts } = response.data
      const { _count } = response.data

      const serializedParts = parts.map((part) => {
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
      setTotalCount(_count)
    }

    loadParts()
  }, [page])

  const partTableData = useMemo(() => {
    return parts.map((part) => {
      return {
        id: part.id,
        render: [
          part.code,
          part.description,
          part.comment || '',
          String(part.created_at),
          <PartStatus key={part.id} status={part.status} />
        ],
        redirectTo: '/parts',
        part_status: part.status
      }
    })
  }, [parts])

  return (
    <Container>
      <Sidebar selected={SidebarLinkTypes.PARTS} />
      <Root open={isModalOpened} onOpenChange={setIsModalOpened}>
        <Main>
          <Header title="Partes" />
          <NewPartModal setIsModalOpened={setIsModalOpened} />
          <Content>
            <p>Teste</p>
            <PartsContainer>
              {totalCount > 0 ? (
                <>
                  <Table
                    titles={[
                      'Part code',
                      'Descrição',
                      'Comentário',
                      'Report Date',
                      'Status',
                      ''
                    ]}
                    data={partTableData}
                  />
                  <Pagination
                    totalCountOfRegisters={totalCount}
                    currentPage={page}
                    onPageChange={setPage}
                  />
                </>
              ) : (
                <NoRegistersContainer>
                  <span>Nenhum registro encontrado</span>
                  <Button icon={Plus} title="Criar nova" />
                  <NewPartModal setIsModalOpened={setIsModalOpened} />
                </NoRegistersContainer>
              )}
            </PartsContainer>
          </Content>
        </Main>
      </Root>
    </Container>
  )
}
