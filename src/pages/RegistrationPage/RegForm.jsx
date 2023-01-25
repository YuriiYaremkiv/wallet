import React, { useState } from 'react';
// import styles from './RegistrationPage.module.scss';

import { AiFillLock } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { userSchema } from './user_validation';
import { Formik, Field, Form, ErrorMessage, useField } from 'formik';
import { register } from 'redux/auth/authOperations';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from 'hooks/useAuth';
import { StyledLink } from './RegPage.styled';
import translation from '../../assets/translation/register.json';
import { translationSelector } from 'redux/translation/translationSelectors';

import styles from './RegForm.module.scss';
import css from './RegForm.module.scss';

import sprite from './icons/register-icons.svg';

const MyTextInput = ({ label, icon, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={css.MyText}>
      <div className={css.MyText__container}>
        <input className={css.MyText__input} {...field} {...props} />
        <svg className={css.MyText__icon} width="24" height="24">
          <use href={icon}></use>
        </svg>
      </div>
      {meta.touched && meta.error ? (
        <div className={css.MyText__error}>{meta.error}</div>
      ) : null}
      {children}
    </div>
  );
};

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
            username: values.name,
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
