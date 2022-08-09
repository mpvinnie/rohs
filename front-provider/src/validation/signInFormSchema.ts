import * as yup from 'yup'

export const signInFormSchema = yup.object().shape({
  id: yup
    .number()
    .required('Campo obrigatório')
    .typeError('Campo numérico obrigatório'),
  password: yup.string().required('Campo obrigatório')
})
