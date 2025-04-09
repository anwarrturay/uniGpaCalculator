import * as yup from 'yup';

const updateInfoSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('First name is required')
    .min(2, 'Must be at least 2 characters'),

  lastname: yup
    .string()
    .required('Last name is required')
    .min(2, 'Must be at least 2 characters'),

    idNumber: yup
    .number()
    .required('ID Number is required'),

    department: yup
    .string()
    .required('Department is required')
    .min(2, 'Department name must be at least 2 characters'),

    level: yup
    .string()
    .oneOf(['Year 1', 'Year 2', 'Year 3', 'Year 4'], 'Select a valid level')
    .required('Level is required'),
    
    image: yup
      .mixed()
});

export default updateInfoSchema;
