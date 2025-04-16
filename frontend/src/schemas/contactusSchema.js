import * as yup from 'yup';

const contactusSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
    issue: yup
        .string()
        .required('Issue is required'),
    message:yup
        .string()
        .required("Message field is required")
});

export default contactusSchema;