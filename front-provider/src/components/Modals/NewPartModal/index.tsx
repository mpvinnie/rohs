import { yupResolver } from '@hookform/resolvers/yup'
import * as Dialog from '@radix-ui/react-dialog'
import { Dispatch, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { api } from '../../../services/api'
import { CreatePart } from '../../../types/Provider'
import { createPartSchema } from '../../../validation/createPartSchema'
import { Input } from '../../Form/Input'
import { SubmitButton } from '../../Form/SubmitButton'
import { Textarea } from '../../Form/Textarea'
import { Close, Content, Overlay, Title } from './styles'

interface NewPartModalProps {
  setIsModalOpened: Dispatch<SetStateAction<boolean>>
}

export function NewPartModal({
  setIsModalOpened
}: NewPartModalProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(createPartSchema)
  })

  const handleCreatePart: SubmitHandler<CreatePart> = async ({
    code,
    comment,
    description
  }) => {
    try {
      const data = {
        code,
        comment,
        description
      }

      await api.post('/providers/parts', data)

      setIsModalOpened(false)

      return toast.success('Parte criada com sucesso!')
    } catch (err) {
      console.log(err.response.data.message)
      return toast.error('Ocorreu um erro ao criar a parte, tente novamente!')
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>Criar nova parte</Title>
        <form onSubmit={handleSubmit(handleCreatePart)}>
          <Input
            placeholder="Part Code"
            {...register('code')}
            error={errors.code}
          />
          <Input
            placeholder="Comentário (opcional)"
            {...register('comment')}
            error={errors.comment}
          />
          <Textarea
            placeholder="Descrição"
            {...register('description')}
            error={errors.description}
          />
          <footer>
            <Close>Cancelar</Close>
            <SubmitButton
              type="submit"
              title="Criar parte"
              isSubmitting={isSubmitting}
            />
          </footer>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
