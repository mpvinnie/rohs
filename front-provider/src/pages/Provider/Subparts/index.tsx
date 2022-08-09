import { useEffect, useState } from 'react'
import { FileText } from 'react-feather'
import { useLocation, useParams } from 'react-router'

import { Header } from '../../../components/Header'
import { Pagination } from '../../../components/Pagination'
import { PartStatus } from '../../../components/PartStatus'
import { Sidebar } from '../../../components/Sidebar'
import { SidebarLinkTypes } from '../../../components/Sidebar/SidebarItem'
import { api } from '../../../services/api'
import { Subpart } from '../../../types/Provider'
import {
  Container,
  Main,
  Content,
  SubpartsContainer,
  SubpartInfo,
  DisapprovalReason,
  Table
} from './styles'

type RouteParam = {
  id: string
}

type SubpartsProps = {
  part_code: string
  disapproval_reason: string
  status: 'disapproved' | 'waiting' | 'disapproved'
}

export function Subparts(): JSX.Element {
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [subparts, setSubparts] = useState<Subpart[]>([])

  const {
    state: { part_code, disapproval_reason, status }
  } = useLocation<SubpartsProps>()

  const { id } = useParams<RouteParam>()

  useEffect(() => {
    async function loadSubpartsData() {
      const response = await api.get<Subpart[]>(`/parts/subparts/${id}`)

      const serializedSubparts = response.data.map((subpart) => {
        return {
          id: subpart.id,
          provider_id: subpart.provider_id,
          part_id: subpart.part_id,
          name: subpart.name,
          subgroup: subpart.subgroup,
          report_date: new Date(subpart.report_date).toLocaleDateString(
            'pt-BR'
          ),
          gwi_11a1: subpart.gwi_11a1,
          fisp_msds: subpart.fisp_msds,
          rohs_report: subpart.rohs_report,
          gwi_11a1_url: subpart.gwi_11a1_url,
          fisp_msds_url: subpart.fisp_msds_url,
          rohs_report_url: subpart.rohs_report_url,
          created_at: subpart.created_at
        }
      })

      setSubparts(serializedSubparts)
      setTotalCount(Number(response.headers['x-total-count']))
    }

    loadSubpartsData()
  }, [id])

  return (
    <Container>
      <Sidebar selected={SidebarLinkTypes.PARTS} />
      <Main>
        <Header />
        <Content>
          <SubpartsContainer>
            <h3>Detalhes da parte</h3>
            <SubpartInfo>
              <div>
                <span>Part Code</span>
                <strong>{part_code}</strong>
              </div>
              <div>
                <span>Status</span>
                <PartStatus status={status} />
              </div>
            </SubpartInfo>
            {disapproval_reason && (
              <DisapprovalReason>
                <span>Motivo de desaprovação</span>
                <p>{disapproval_reason}</p>
              </DisapprovalReason>
            )}

            <Table>
              <thead>
                <tr>
                  <th>Subpartes</th>
                  <th>Subgrupo</th>
                  <th>GWI-11a1</th>
                  <th>FISP-MSDS</th>
                  <th>RoHS Report</th>
                  <th>Submit Date</th>
                </tr>
              </thead>
              <tbody>
                {subparts.length > 0 ? (
                  subparts.map((subpart) => (
                    <tr key={subpart.id}>
                      <td>{subpart.name}</td>
                      <td>{subpart.subgroup}</td>
                      <td className="doc">
                        <a
                          href={subpart.gwi_11a1_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FileText size={20} />
                        </a>
                      </td>
                      <td className="doc">
                        <a href={subpart.fisp_msds_url}>
                          <FileText size={20} />
                        </a>
                      </td>
                      <td className="doc">
                        <a href={subpart.rohs_report_url}>
                          <FileText size={20} />
                        </a>
                      </td>
                      <td>{subpart.report_date}</td>
                    </tr>
                  ))
                ) : (
                  <p>Nenhuma subparte encontrada</p>
                )}
              </tbody>
            </Table>
            <Pagination
              totalCountOfRegisters={totalCount}
              currentPage={page}
              onPageChange={setPage}
            />
          </SubpartsContainer>
        </Content>
      </Main>
    </Container>
  )
}
