import fispqmsds from '../../../assets/fispqmsds.png'
import addPart from '../../../assets/imgNewPart.png'
import logoImg from '../../../assets/logo.svg'
import { Button } from '../../../components/Button'
import { FormButton } from '../../../components/FormButton'
import { PartStatus } from '../../../components/PartStatus'
import { Container, Content, Form, Header, Details, Table } from './styles'

export function DetailsPart() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Rohs" />
        <Form>
          <h3>Detalhes da Parte</h3>
          <Header>
            <Details>
              <div>
                <label>Part Code</label>
                <h4>XXXXXXXXXX</h4>
              </div>
              <div>
                <label>Descrição</label>
                <p>Lorem ipsum dolor sit amet</p>
              </div>
              <div>
                <label>Status</label>
                <PartStatus status="SENT_FOR_REVIEW" />
              </div>
            </Details>
            <img src={addPart} alt="Update image" />
          </Header>
          <Table>
            <thead>
              <tr>
                <th>Subpartes</th>
                <th>Material_type</th>
                <th>FISPQ-MSDS</th>
                <th>RoHS Report</th>
                <th>RoHS Report Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Subpart_Name</td>
                <td>Metal</td>
                <td>
                  <a>
                    <img src={fispqmsds} alt="downloadarquivo" />
                  </a>
                </td>
                <td>
                  <a>
                    <img src={fispqmsds} alt="downloadarquivo" />
                  </a>
                </td>
                <td>31/08/2022</td>
              </tr>
            </tbody>
          </Table>
          <Button title="Voltar" to="/parts" />
        </Form>
      </Content>
    </Container>
  )
}
