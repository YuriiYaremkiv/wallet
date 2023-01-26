import { useState } from 'react';

import PasswordStrengthMeter from './PasswordStrengthMeter';
import { userSchema } from './user_validation';
import { Formik, Form } from 'formik';
import { register } from 'redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { StyledLink } from './RegPage.styled';

import { MyTextInput } from 'block/MyTextInput/MyTextInput';

import css from './RegisterForm.module.scss';
import sprite from './icons/register-icons.svg';

export const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error } = useAuth();

  const handleChange = ({ target }) => {
    if (target.name === 'password') {
      setPassword(target.value);
    }
  };
  const [password, setPassword] = useState('');
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirm_password: '',
        username: '',
      }}
      validationSchema={userSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(
          register({
            username: values.username,
            email: values.email,
            password: values.password,
          })
        );

        resetForm();
      }}
    >
      {formik => (
        <Form onChange={handleChange}>
          <MyTextInput
            name="email"
            type="email"
            placeholder="Email"
            icon={sprite + '#email'}
          />

          <MyTextInput
            name="password"
            type="password"
            placeholder="Password"
            icon={sprite + '#lock'}
          >
            <PasswordStrengthMeter password={password} />
          </MyTextInput>

          <MyTextInput
            name="password"
            type="password"
            placeholder="Confirm password"
            icon={sprite + '#lock'}
          />

          <MyTextInput
            name="username"
            type="text"
            placeholder="First name"
            icon={sprite + '#user'}
          />

          <button className={css.RegisterForm_btn} type="submit">
            Register
          </button>

          <StyledLink to="/"> LOG IN</StyledLink>
          {error && <p>{error}</p>}
        </Form>
      )}
    </Formik>
  );
};
