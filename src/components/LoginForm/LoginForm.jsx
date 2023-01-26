import { userSchema } from './user_validation';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/authOperations';
import { useAuth } from 'hooks/useAuth';
// import { StyledLink } from './LoginPage.styled';

import css from './LoginForm.module.scss';
import sprite from './icons/register-icons.svg';

import { MyTextInput } from 'block/MyTextInput/MyTextInput';
import { Button } from 'block/Button/Button';
import { NavlinkTo } from 'block/NavlinkTo/NavlinkTo';

export const LoginForm = () => {
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
            placeholder="E-mail"
            icon={sprite + '#email'}
          />

          <MyTextInput
            name="password"
            type="password"
            placeholder="Password"
            icon={sprite + '#lock'}
          />

          <Button title="Log IN" />
          <NavlinkTo title="REGISTER" to="/register" />

          {/* <div className={css.input_wrapper}></div>
          <button className={css.register_btn} type="submit">
            {translation[language].login}
          </button> */}
          {/* <StyledLink to="/registration">
            {translation[language].register}
          </StyledLink> */}
          {error && <p>{error}</p>}
        </Form>
      )}
    </Formik>
  );
};
