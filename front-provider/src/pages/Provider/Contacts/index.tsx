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
  PathLinks,
  ContactsContainer,
  Table,
  ButtonOptions
} from './styles'

export function Contacts(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    api.get(`/providers/contacts?page=${page}&per_page=10`).then((response) => {
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
          <PathLinks>
            <span>Contatos</span>
          </PathLinks>
          <ContactsContainer>
            <header>
              <h3>Contatos</h3>
              <Button icon={Plus} title="Criar novo" to="/contacts/new" />
            </header>
            <Table>
              <thead>
                <tr>
                  <th>Departamento</th>
                  <th>Nome</th>
                  <th>Position</th>
                  <th>Email</th>
                  <th>Contato Primário</th>
                  <th>Contato Secundário</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts ? (
                  contacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.department}</td>
                      <td>{contact.name}</td>
                      <td>{contact.position}</td>
                      <td>{contact.email}</td>
                      <td>{contact.phone}</td>
                      <td>
                        {contact.secondary_phone
                          ? contact.secondary_phone
                          : '--'}
                      </td>
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
