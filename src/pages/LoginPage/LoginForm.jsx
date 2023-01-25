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

import { MyTextInput } from 'block/MyTextInput/MyTextInput';

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
