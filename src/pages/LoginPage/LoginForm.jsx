import { userSchema } from './user_validation';
import { Formik, Form, useField } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from 'redux/auth/authOperations';
import { useAuth } from 'hooks/useAuth';
import { StyledLink } from './LoginPage.styled';
import translation from '../../assets/translation/register.json';
import { translationSelector } from 'redux/translation/translationSelectors';

import css from './LoginForm.module.scss';
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

export default function LoginForm() {
  const language = useSelector(translationSelector);
  const { error } = useAuth();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirm_password: '',
        name: '',
      }}
      validationSchema={userSchema}
      onSubmit={(values, { resetForm }) => {
        dispatch(
          logIn({
            email: values.email,
            password: values.password,
          })
        );
        resetForm();
      }}
    >
      {formik => (
        <Form>
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
          />

          <div className={css.input_wrapper}></div>
          <button className={css.register_btn} type="submit">
            {translation[language].login}
          </button>
          <StyledLink to="/registration">
            {translation[language].register}
          </StyledLink>
          {error && <p>{error}</p>}
        </Form>
      )}
    </Formik>
  );
}
