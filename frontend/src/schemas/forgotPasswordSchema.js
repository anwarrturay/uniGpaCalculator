import * as yup from 'yup'

const emailSchema = yup.object().shape({
    email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
})

export default emailSchema