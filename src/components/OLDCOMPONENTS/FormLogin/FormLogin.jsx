import { useState } from 'react';
import { userSchema } from './user_validation';
import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/authOperations';
import { useAuth } from 'hooks/useAuth';

import sprite from './icons/register-icons.svg';

import { MyTextInput } from 'block/MyTextInput/MyTextInput';
import { MyPasswordInput } from 'components/OLDCOMPONENTS/MyPasswordInput/MyPasswordInput';

import { Button } from 'block/Button/Button';
import { NavlinkTo } from 'block/NavlinkTo/NavlinkTo';

export const FormLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

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

          <MyPasswordInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            showPassword={showPassword}
            changeShowPasswordFunc={setShowPassword}
            icon={sprite + '#lock'}
          />

          <Button title="Log IN" />
          <NavlinkTo title="REGISTER" to="/register" />
          {error && (
            <p
              style={{ paddingTop: '12px', color: 'red', textAlign: 'center' }}
            >
              {error}
            </p>
          )}
        </Form>
      )}
    </Formik>
  );
};
