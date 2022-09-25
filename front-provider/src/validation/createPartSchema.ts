import * as yup from 'yup'

export const createPartSchema = yup.object().shape({
  code: yup.string().required('Campo obrigatório'),
  comment: yup.string(),
  description: yup.string().required('Campo obrigatório')
})
