import React, { useState } from 'react';

import PasswordStrengthMeter from './PasswordStrengthMeter';
import { userSchema } from './user_validation';
import { Formik, Form, ErrorMessage, useField } from 'formik';
import { register } from 'redux/auth/authOperations';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { StyledLink } from './RegPage.styled';
import translation from '../../assets/translation/register.json';
import { translationSelector } from 'redux/translation/translationSelectors';

import styles from './RegForm.module.scss';
import css from './RegForm.module.scss';

import sprite from './icons/register-icons.svg';

import { MyTextInput } from 'block/MyTextInput/MyTextInput';

export default function RegForm() {
  const language = useSelector(translationSelector);
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
            placeholder={translation[language].email}
            icon={sprite + '#email'}
          />

          <MyTextInput
            name="password"
            type="password"
            placeholder={translation[language].password}
            icon={sprite + '#lock'}
          >
            <PasswordStrengthMeter password={password} />
          </MyTextInput>

          <MyTextInput
            name="password"
            type="password"
            placeholder={translation[language].confirm_password}
            icon={sprite + '#lock'}
          />

          <MyTextInput
            name="username"
            type="text"
            placeholder={translation[language].name}
            icon={sprite + '#user'}
          />

          <button className={styles.register_btn} type="submit">
            {translation[language].register}
          </button>

          <StyledLink to="/"> {translation[language].login}</StyledLink>
          {error && <p>{error}</p>}
        </Form>
      )}
    </Formik>
  );
}
