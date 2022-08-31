import fispqmsds from '../../../assets/fispqmsds.png'
import addPart from '../../../assets/imgNewPart.png'
import logoImg from '../../../assets/logo.svg'
import { FormButton } from '../../../components/FormButton'
import { Input } from '../../../components/Input'
import {
  Container,
  Content,
  Form,
  Header,
  InputWrapper,
  Details,
  Table
} from './styles'

export function NewPart() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Rohs" />
        <Form>
          <h3>Detalhes da Peça</h3>
          <Header>
            <InputWrapper>
              <Input name="salcompCode" label="Salcomp Code. *" />
              <Input name="description" label="Description. *" />
            </InputWrapper>
            <Details>
              <p>
                Preenchimento GW114-11A1 Prezado(a) muita atenção no
                preenchimento do formulário de Declaração de Material GW114-11A1
                ...importância do documento ...faça do download do formulário
                <a>clicando aqui</a> preencha e registre ao lado
              </p>
              <img src={addPart} alt="Update image" />
            </Details>
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
                <td>
                  <select id="subparts" name="lista-subparts">
                    <option>Metal</option>
                    <option>Plastico</option>
                    <option>Papel</option>
                    <option>Fita</option>
                  </select>
                </td>
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
          <FormButton isSubmitting={false} title={'Enviar Para Aprovação'} />
        </Form>
      </Content>
    </Container>
  )
}
