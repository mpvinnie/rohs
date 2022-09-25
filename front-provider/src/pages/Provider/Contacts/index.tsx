import { useState, useEffect } from 'react'
import { Edit2, Plus, Trash } from 'react-feather'

import { Button } from '../../../components/Button'
import { Header } from '../../../components/Header'
import { Pagination } from '../../../components/Pagination'
import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import { api } from '../../../services/api'
import { Contact } from '../../../types/Provider'
import {
  Container,
  Main,
  Content,
  ContactsContainer,
  Table,
  ButtonOptions
} from './styles'

export function Contacts(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    api.get('/providers/contacts').then((response) => {
      setContacts(response.data)
      setTotalCount(Number(response.headers['x-total-count']))
    })
  }, [page])

  return (
    <Container>
      <Sidebar selected={SidebarLinkTypes.CONTACTS} />
      <Main>
        <Header />
        <Content>
          <ContactsContainer>
            <header>
              <h3>Contatos</h3>
              <Button icon={Plus} title="Criar novo" to="/contacts/new" />
            </header>
            <Table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Departamento</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Celular</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts ? (
                  contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.department.name}</td>
                      <td>{contact.position}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone_number}</td>
                      <td>
                        <ButtonOptions type="button" option="edit">
                          <Edit2 size={16} />
                        </ButtonOptions>
                      </td>
                      <td>
                        <ButtonOptions type="button" option="delete">
                          <Trash size={16} />
                        </ButtonOptions>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>Nenhum contato encontrado</p>
                )}
              </tbody>
            </Table>

            <Pagination
              totalCountOfRegisters={totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </ContactsContainer>
        </Content>
      </Main>
    </Container>
  )
}
