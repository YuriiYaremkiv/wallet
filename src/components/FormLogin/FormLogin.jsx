import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FormHelperText, Input } from '@mui/material';
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import css from './FormLogin.module.scss';

import { logIn } from 'redux/auth/authOperations';

export const FormLogin = ({ handleUserRegister }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const { themeMode } = useSelector(state => state.themeMode);
  // const styles = modeConfig.style[themeMode];
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t('formikInvalidEmail'))
        .required(t('required')),
      password: Yup.string()
        .min(6, t('formikMin6'))
        .max(20, t('formikMax20'))
        .required(t('required')),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        logIn({
          email: values.email,
          password: values.password,
        })
      );

      resetForm();
    },
  });

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(show => !show);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      // style={{ ...styles.backgroundColorInput }}
      className={css.form}
    >
      {/* Email - start */}
      <FormControl sx={{ width: '100%' }} variant="standard">
        <TextField
          label={t('email')}
          variant="standard"
          id="email"
          name="email"
          type="email"
          size="small"
          error={Boolean(formik.touched.email && formik.errors.email)}
          className={css.input}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <FormHelperText
          error={Boolean(formik.touched.email && formik.errors.email)}
          style={{
            height: '14px',
            marginTop: 0,
            marginBottom: '4px',
            padding: 0,
            fontSize: '12px',
            visibility:
              formik.touched.email && formik.errors.email
                ? 'visible'
                : 'hidden',
          }}
        >
          {formik.errors.password}
        </FormHelperText>
      </FormControl>
      {/* Email - end */}

      {/* Password - start */}
      <FormControl sx={{ width: '100%' }} variant="standard">
        <InputLabel
          htmlFor="standard-adornment-password"
          size="small"
          error={Boolean(formik.touched.password && formik.errors.password)}
        >
          {t('password')}
        </InputLabel>
        <Input
          id="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          type={showPassword ? 'text' : 'password'}
          size="small"
          error={Boolean(formik.touched.password && formik.errors.password)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={t('password')}
        />
        <FormHelperText
          error={Boolean(formik.touched.password && formik.errors.password)}
          style={{
            height: '14px',
            marginTop: 0,
            marginBottom: '16px',
            padding: 0,
            fontSize: '12px',
            visibility:
              formik.touched.password && formik.errors.password
                ? 'visible'
                : 'hidden',
          }}
        >
          {formik.errors.password}
        </FormHelperText>
      </FormControl>
      {/* Password - end */}

      <Button type="submit" variant="contained" className={css.form__button}>
        {t('signIn')}
      </Button>
      <Link to="/register" className={css.form__link}>
        {t('signInNotification')}
      </Link>
    </form>
  );
};
