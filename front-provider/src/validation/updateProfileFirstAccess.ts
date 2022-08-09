import * as yup from 'yup'

export const updateProfileFirstAccess = yup.object().shape({
  name: yup.string(),
  cnpj: yup.string(),
  primary_email: yup.string().email('Insira um e-mail válido'),
  secondary_email: yup.string().email('Insira um e-mail válido'),
  branch: yup.string().required('Campo obrigatório'),
  primary_contact: yup.string().required('Campo obrigatório'),
  secondary_contact: yup.string()
})
