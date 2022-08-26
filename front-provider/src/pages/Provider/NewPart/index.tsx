import addPart from '../../../assets/defaultAvatar.png'
import logoImg from '../../../assets/logo.svg'
import { FormButton } from '../../../components/FormButton'
import { Container, Content, Form, Header } from './styles'

export function NewPart() {
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Rohs" />
        <Form>
          <Header>
            <h3>Detalhes da Peça</h3>
            <input type="text" placeholder="Salcomp Code. *" />
            <input type="text" placeholder="Description . *" />
            <p>
              Preenchimento GW114-11A1 <br />
              Prezado(a) muita atenção no preenchimento do formulário de
              Declaração de Material GW114-11A1 <br />
              ...(importância do documento ...faça do download do formulário{' '}
              <a>clicando aqui</a> preencha e registre ao lado
            </p>
            <img src={addPart} alt="Update image" />
          </Header>
          <FormButton isSubmitting={false} title={'Enviar Para Aprovação'} />
          <FormButton isSubmitting={false} title={'Salvar Temporariamente'} />
          <FormButton isSubmitting={false} title={'Cancelar'} />
        </Form>
      </Content>
    </Container>
  )
}
