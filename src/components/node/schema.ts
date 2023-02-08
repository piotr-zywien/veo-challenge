import * as Yup from 'yup';
import "yup-phone";


const schema = Yup.object({
  id: Yup
    .string()
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
    .phone('DK', true, 'Invalid phone number!'),
  email: Yup
    .string()
    .email('Invalid email address!')
    .required('Email is required!'),
  expanded: Yup
    .boolean()
    .required(),
});

export default schema;
