import * as Yup from 'yup';
import "yup-phone";


const schema = Yup.object({
  firstName: Yup
    .string()
    .required('First Name is required!')
    .test('len', 'Empty Name is not allowed!', val => val.length > 0),
  lastName: Yup
    .string()
    .required('Last Name is required!')
    .test('len', 'Empty Last Name is not allowed!', val => val.length > 0),
  title: Yup
    .string()
    .required('Title is required!')
    .test('len', 'Empty Title is not allowed!', val => val.length > 0),
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
});

export default schema;
