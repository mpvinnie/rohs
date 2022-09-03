import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft } from 'react-feather'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

import { FormButton } from '../../../components/FormButton'
import { Input } from '../../../components/Input'
import { api } from '../../../services/api'
import { CreateContact } from '../../../types/Provider'
import { createContactFormSchema } from '../../../validation/createContactFormSchema'
import {
  Container,
  Content,
  Header,
  PathLinks,
  NewContactFormContainer
} from './styles'

export function NewContact(): JSX.Element {
  const { goBack } = useHistory()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(createContactFormSchema)
  })

  const handleCreateContact: SubmitHandler<CreateContact> = async ({
    department,
    name,
    email,
    position,
    phone_number
  }) => {
    console.log(`chegou aqui`)
    try {
      const data = {
        department,
        name,
        email,
        position,
        phone_number
      }

      await api.post('/providers/contacts', data)

      goBack()
      return toast.success('Contato criado com sucesso!')
    } catch (err) {
      return toast.error(
        `Ocorreu um erro ao tentar criar um novo contato, por favor tente novamente! ${err.response.data.message}`
      )
    }
  }

  return (
    <Container>
      <Content>
        <Header>
          <PathLinks>
            <Link to="/contacts">Contatos</Link>
            <span>{'>'}</span>
            <strong>Novo contato</strong>
          </PathLinks>

          <Link to="/contacts">
            <ArrowLeft size={24} />
          </Link>
        </Header>

        <NewContactFormContainer onSubmit={handleSubmit(handleCreateContact)}>
          <h2>Novo contato</h2>
          <Input
            label="Nome"
            placeholder="Insira um nome"
            {...register('name')}
            error={errors.name}
          />

          <Input
            label="Departamento"
            placeholder="Insira um departamento"
            {...register('department')}
            error={errors.department}
          />

          <Input
            label="E-mail"
            placeholder="Insira um e-mail"
            {...register('email')}
            error={errors.email}
          />

          <Input
            label="Posição"
            placeholder="Insira a posição"
            {...register('position')}
            error={errors.position}
          />

          <Input
            label="Celular"
            placeholder="Insira um número de celular"
            {...register('phone_number')}
            error={errors.phone_number}
          />

          <FormButton
            type="submit"
            isSubmitting={isSubmitting}
            title="Criar contato"
          />
        </NewContactFormContainer>
      </Content>
    </Container>
  )
}
