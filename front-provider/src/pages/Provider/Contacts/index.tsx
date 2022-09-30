import { useEffect, useMemo, useState } from 'react'
import { Plus } from 'react-feather'

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
  ButtonTrigger,
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
      <Main>
        <Header />
        <Content open={isModalOpened} onOpenChange={setIsModalOpened}>
          <ContactsContainer>
            <header>
              <h1>Contatos</h1>
              {totalCount > 0 && (
                <ButtonTrigger>
                  <Plus size={24} />
                  Criar novo
                </ButtonTrigger>
              )}
              <NewPartModal setIsModalOpened={setIsModalOpened} />
            </header>
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
                <ButtonTrigger>
                  <Plus size={24} />
                  Criar novo contato
                </ButtonTrigger>
                <NewPartModal setIsModalOpened={setIsModalOpened} />
              </NoRegistersContainer>
            )}
          </ContactsContainer>
        </Content>
      </Main>
    </Container>
  )
}
