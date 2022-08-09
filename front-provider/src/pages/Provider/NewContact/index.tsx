import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowLeft } from 'react-feather'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { FormButton } from '../../../components/FormButton'
import { Input } from '../../../components/Input'
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
    phone,
    secondary_phone
  }) => {
    const data = {
      department,
      name,
      email,
      position,
      phone,
      secondary_phone
    }

    // await signIn(data)
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
            label="Departamento"
            placeholder="Insira um departamento"
            {...register('department')}
            error={errors.department}
          />

          <Input
            label="Nome"
            placeholder="Insira um nome"
            {...register('name')}
            error={errors.name}
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
            label="Contato primário"
            placeholder="Insira um número de telefone"
            {...register('phone')}
            error={errors.phone}
          />

          <Input
            label="Contato secundário"
            placeholder="Insira um número de telefone"
            {...register('secondary_phone')}
            error={errors.secondary_phone}
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
