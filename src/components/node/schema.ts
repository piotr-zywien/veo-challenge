 import * as Yup from 'yup';


const schema = Yup.object({
  id: Yup
    .number()
    .required('ID is required!'),
  firstName: Yup
    .string()
    .required('First Name is required!'),
  lastName: Yup
    .string()
    .required('Last Name is required!'),
  title: Yup
    .string()
    .required('Title is required!'),
  department: Yup
    .string()
    .optional(),
  phone: Yup
    .string()
    .optional(),
  email: Yup
    .string()
    .email('Invalid email address!')
    .required('Email is required!'),
  expanded: Yup
    .boolean()
    .required(),
});

export default schema;
