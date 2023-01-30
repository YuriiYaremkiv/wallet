import { useState, useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import { userSchema } from './user_validation';
import { Formik, Form } from 'formik';
import { register } from 'redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { useAuth } from 'hooks/useAuth';

import InputAdornment from '@mui/material/InputAdornment';
import { MyTextInput } from 'block/MyTextInput/MyTextInput';
import { MyPasswordInput } from 'block/MyPasswordInput/MyPasswordInput';
import { Button } from 'block/Button/Button';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
          {/* new area for password */}
          <MyPasswordInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="New passsword!"
            showPassword={showPassword}
            changeShowPasswordFunc={setShowPassword}
            icon={sprite + '#lock'}
          />

          <MyTextInput
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            icon={sprite + '#lock'}
            password={true}
            changeShowPasswordFunc={setShowPassword}
          >
            <PasswordStrengthMeter password={password} />
          </MyTextInput>

          <MyTextInput
            name="confirm_password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            icon={sprite + '#lock'}
            password={true}
            changeShowPasswordFunc={setShowConfirmPassword}
          />

          <MyTextInput
            name="username"
            type="text"
            placeholder="First name"
            icon={sprite + '#user'}
          />
          <Button title="REGISTER" />

          <NavlinkTo title="LOG IN" to="/" />
          {error && <p>{error}</p>}
        </Form>
      )}
    </Formik>
  );
};
