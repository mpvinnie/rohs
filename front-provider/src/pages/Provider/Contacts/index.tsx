import { Root } from '@radix-ui/react-dialog'
import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'react-feather'

import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'
import { NewPartModal } from '../../../components/Modals/NewPartModal'
import { Pagination } from '../../../components/Pagination'
import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import { Table } from '../../../components/Table'
import { api } from '../../../services/api'
import { Contact } from '../../../types/Provider'
import {
  Container,
  Main,
  Content,
  ContactsContainer,
  NoRegistersContainer
} from './styles'

interface IContact {
  contacts: Contact[]
  _count: number
}

export function Contacts(): JSX.Element {
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [contacts, setContacts] = useState<Contact[]>([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    async function loadContacts() {
      const response = await api.get<IContact>(
        `/providers/contacts?page=${page}&per_page=10`
      )
      const { contacts } = response.data
      const { _count } = response.data

      setContacts(contacts)
      setTotalCount(_count)
    }

    loadContacts()
  }, [page])

  const contactTableData = useMemo(() => {
    return contacts.map((contact) => {
      return {
        id: contact.id,
        render: [
          contact.name,
          contact.email,
          contact.phone_number,
          contact.position,
          contact.department.name
        ],
        redirectTo: '/contacts'
      }
    })
  }, [contacts])

  return (
    <Container>
      <Sidebar selected={SidebarLinkTypes.CONTACTS} />
      <Root open={isModalOpened} onOpenChange={setIsModalOpened}>
        <Main>
          <Header title="Contatos" buttonTitle="Criar novo" />
          <NewPartModal setIsModalOpened={setIsModalOpened} />
          <Content>
            <ContactsContainer>
              {totalCount > 0 ? (
                <>
                  <Table
                    titles={[
                      'Nome',
                      'Email',
                      'Número de Telefone',
                      'Posição',
                      'Departamento',
                      ''
                    ]}
                    data={contactTableData}
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
                  <Button title="Criar novo" icon={Plus} />
                  <NewPartModal setIsModalOpened={setIsModalOpened} />
                </NoRegistersContainer>
              )}
            </ContactsContainer>
          </Content>
        </Main>
      </Root>
    </Container>
  )
}
