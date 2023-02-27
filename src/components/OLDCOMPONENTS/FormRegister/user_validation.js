import * as yup from 'yup';

export const userSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(16).required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'passwords must match'),
  username: yup.string().min(3).max(16).required(),
});
