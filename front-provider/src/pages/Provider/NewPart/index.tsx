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
  Details
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
                Preenchimento GW114-11A1 <br />
                Prezado(a) muita atenção no preenchimento do formulário de
                Declaração de Material GW114-11A1 <br />
                ...(importância do documento ...faça do download do formulário
                {''}
                <a>clicando aqui</a> preencha e registre ao lado
              </p>
              <img src={addPart} alt="Update image" />
            </Details>
          </Header>
          <FormButton isSubmitting={false} title={'Enviar Para Aprovação'} />
        </Form>
      </Content>
    </Container>
  )
}
