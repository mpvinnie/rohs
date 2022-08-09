import * as yup from 'yup'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const createContactFormSchema = yup.object().shape({
  department: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  position: yup.string().required(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required(),
  secondary_phone: yup
    .string()
    .matches(phoneRegExp, 'Seconday Phone is not valid')
    .optional()
    .nullable()
})
