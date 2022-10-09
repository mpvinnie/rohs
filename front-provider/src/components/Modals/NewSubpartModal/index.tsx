import { yupResolver } from '@hookform/resolvers/yup'
import * as Dialog from '@radix-ui/react-dialog'
import subYears from 'date-fns/subYears'
import { Dispatch, SetStateAction, useMemo } from 'react'
import { FileText } from 'react-feather'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { api } from '../../../services/api'
import { createSubpartSchema } from '../../../validation/createSubpartSchema'
import { Input } from '../../Form/Input'
import { InputFile } from '../../Form/InputFile'
import { Select } from '../../Form/Select'
import { SubmitButton } from '../../Form/SubmitButton'
import { Close, Content, Overlay, Title } from './styles'

interface NewSubpartModalProps {
  setIsModalOpened: Dispatch<SetStateAction<boolean>>
  part_id: string
}

export function NewSubpartModal({
  setIsModalOpened,
  part_id
}: NewSubpartModalProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(createSubpartSchema)
  })

  const currentDate = useMemo(() => {
    return new Date().toISOString().split('T')[0]
  }, [])

  const limitDateRohsReport = useMemo(() => {
    return subYears(new Date(), 2).toISOString().split('T')[0]
  }, [])

  const handleCreatePart = async (data: any) => {
    try {
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('material_type', data.material_type)
      formData.append(
        'rohs_report_date',
        new Date(data.rohs_report_date).toISOString()
      )
      formData.append('gwi4_11a1', data.gwi4_11a1[0])
      formData.append('fispq_msds', data.fispq_msds[0])
      formData.append('rohs_report', data.rohs_report[0])

      await api.post(`/providers/parts/subparts/${part_id}`, formData)
      setIsModalOpened(false)
      return toast.success('Subparte criada com sucesso!')
    } catch (err) {
      console.log(err.response.data.message)
      return toast.error(
        'Ocorreu um erro ao criar a subparte, tente novamente!'
      )
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Title>Criar nova subparte</Title>
        <form onSubmit={handleSubmit(handleCreatePart)}>
          <Input
            label="Nome"
            placeholder="Nome da subparte"
            {...register('name')}
            error={errors.name}
          />
          <Select
            label="Material"
            options={[
              {
                value: '',
                name: 'Selecione o tipo de material',
                disabled: true
              },
              {
                value: 'METAL',
                name: 'Metal'
              },
              {
                value: 'PLASTIC',
                name: 'Plástico'
              },
              {
                value: 'PAPER',
                name: 'Papel'
              },
              {
                value: 'TAPE',
                name: 'Fita'
              }
            ]}
            {...register('material_type')}
            error={errors.material_type}
          />
          <Input
            label="Rohs Report Date"
            placeholder="Data do relatório Rohs"
            type="date"
            min={limitDateRohsReport}
            max={currentDate}
            {...register('rohs_report_date')}
            error={errors.rohs_report_date}
          />
          <InputFile
            label="gwi4_11a1"
            icon={FileText}
            {...register('gwi4_11a1')}
            error={errors.gwi4_11a1}
          />
          <InputFile
            label="fispq_msds"
            icon={FileText}
            {...register('fispq_msds')}
            error={errors.fispq_msds}
          />
          <InputFile
            label="rohs_report"
            icon={FileText}
            {...register('rohs_report')}
            error={errors.rohs_report}
          />
          <footer>
            <Close>Cancelar</Close>
            <SubmitButton
              type="submit"
              title="Criar subparte"
              isSubmitting={isSubmitting}
            />
          </footer>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
