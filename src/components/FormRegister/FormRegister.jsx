import { useState } from 'react';
import { CheckPasswordStrength } from './CheckPasswordStrength';
import { userSchema } from './user_validation';
import { Formik, Form } from 'formik';
import { register } from 'redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';

import { MyTextInput } from 'block/MyTextInput/MyTextInput';
import { MyPasswordInput } from 'block/MyPasswordInput/MyPasswordInput';
import { Button } from 'block/Button/Button';

import sprite from './icons/register-icons.svg';
import { NavlinkTo } from 'block/NavlinkTo/NavlinkTo';

export const FormRegister = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { error } = useAuth();
  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    if (target.name === 'password') {
      setPassword(target.value);
    }
  };

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

          <MyPasswordInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Passsword"
            showPassword={showPassword}
            changeShowPasswordFunc={setShowPassword}
            icon={sprite + '#lock'}
          >
            <CheckPasswordStrength password={password} />
          </MyPasswordInput>

          <MyPasswordInput
            name="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm passsword!"
            showPassword={showConfirmPassword}
            changeShowPasswordFunc={setShowConfirmPassword}
            icon={sprite + '#lock'}
          />

          <MyTextInput
            name="username"
            type="text"
            placeholder="First name"
            icon={sprite + '#user'}
          />

          <Button title="REGISTER" />

          <NavlinkTo title="LOG IN" to="/" />
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
