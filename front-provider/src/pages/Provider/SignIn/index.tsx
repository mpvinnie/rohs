import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import logoImg from '../../../assets/logo.svg'
import { Input } from '../../../components/Form/Input'
import { SubmitButton } from '../../../components/Form/SubmitButton'
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
            label="ID"
            type="number"
            placeholder="Digite seu ID"
            {...register('id')}
            error={errors.id}
          />

          <Input
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            {...register('password')}
            error={errors.password}
          />

          <SubmitButton
            title="Entrar"
            type="submit"
            isSubmitting={isSubmitting}
          />

          <Link to="#">Esqueci minha senha</Link>
        </Form>
      </Content>
    </Container>
  )
}
