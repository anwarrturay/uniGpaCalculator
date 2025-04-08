// schemas/loginSchema.js
import * as yup from 'yup';

const loginSchema = yup.object().shape({
  idNumber: yup
    .number()
    .required('ID Number is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export default loginSchema;
