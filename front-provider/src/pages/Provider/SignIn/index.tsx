import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import logoImg from '../../../assets/logo.svg'
import { FormButton } from '../../../components/FormButton'
import { Input } from '../../../components/Input'
import { SignInCredentials, useAuth } from '../../../hooks/AuthContext'
import { signInFormSchema } from '../../../validation/signInFormSchema'
import { Container, Content, Form } from './styles'

export function SignIn(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  })

  const { signIn } = useAuth()

  const handleSignIn: SubmitHandler<SignInCredentials> = async ({
    id,
    password
  }) => {
    const data = {
      id: Number(id),
      password
    }

    await signIn(data)
  }

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="RoHS" />
        <Form onSubmit={handleSubmit(handleSignIn)}>
          <Input
            type="number"
            label="ID"
            placeholder="Digite seu ID"
            {...register('id')}
            error={errors.id}
          />

          <Input
            type="password"
            label="Senha"
            placeholder="Digite sua senha"
            {...register('password')}
            error={errors.password}
          />

          <Link to="#">Esqueci minha senha</Link>

          <FormButton
            title="Entrar"
            type="submit"
            isSubmitting={isSubmitting}
          />
        </Form>
      </Content>
    </Container>
  )
}
