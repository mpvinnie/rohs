import * as yup from 'yup'

export const createSubpartSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  material_type: yup.string().required('Campo obrigatório'),
  rohs_report_date: yup.string().required('Campo obrigatório'),
  gwi4_11a1: yup
    .mixed()
    .required('Selecione um arquivo')
    .test('fileSize', 'O arquivo é muito grande', (value) => {
      return value && value[0].size <= 5000000
    }),
  fispq_msds: yup
    .mixed()
    .required('Selecione um arquivo')
    .test('fileSize', 'O arquivo é muito grande', (value) => {
      return value && value[0].size <= 5000000
    }),
  rohs_report: yup
    .mixed()
    .required('Selecione um arquivo')
    .test('fileSize', 'O arquivo é muito grande', (value) => {
      return value && value[0].size <= 5000000
    })
})
