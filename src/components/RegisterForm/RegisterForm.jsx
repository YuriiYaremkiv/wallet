import { NavLink } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import css from './RegisterForm.module.scss';
import sprite from './icons/register-icons.svg';

const MyTextInput = ({ label, icon, ...props }) => {
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
    </div>
  );
};

export const RegisterForm = () => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        username: '',
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        password: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        // dispatch(authOperations.register(values));
        // setSubmitting(false);
      }}
    >
      <Form className={css.RegistrationForm}>
        <MyTextInput
          name="email"
          type="email"
          placeholder="E-mail"
          icon={sprite + '#email'}
        />

        <MyTextInput
          name="password"
          type="password"
          placeholder="Password"
          icon={sprite + '#lock'}
        />

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

        <button className={css.RegistrationForm__button} type="submit">
          Register
        </button>
        <NavLink className={css.RegistrationForm__Navlink} to="/login">
          LOGIN
        </NavLink>
      </Form>
    </Formik>
  );
};
