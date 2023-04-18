import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FormHelperText, Input } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { register } from 'redux/auth/authOperations';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import css from './FormRegister.module.scss';

const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
  },
  palette: {
    primary: {
      main: 'rgba(74, 86, 226, 1)',
    },
  },
});

export const FormRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('formikMin3'))
        .max(15, t('formikMax15'))
        .required(t('required')),
      email: Yup.string()
        .email(t('formikInvalidEmail'))
        .required(t('required')),
      password: Yup.string()
        .min(6, t('formikMin6'))
        .max(20, t('formikMax20'))
        .required(t('required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t('formikPasswordConfirm'))
        .min(6, t('formikMin6'))
        .max(20, t('formikMax20'))
        .required(t('required')),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(
        register({
          username: values.name,
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
    <form onSubmit={formik.handleSubmit} className={css.form}>
      <ThemeProvider theme={theme}>
        <FormControl sx={{ width: '100%' }} variant="standard">
          <TextField
            label={t('name')}
            variant="standard"
            id="name"
            name="name"
            type="text"
            size="small"
            error={Boolean(formik.touched.name && formik.errors.name)}
            className={css.input}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <FormHelperText
            size="small"
            error={Boolean(formik.touched.name && formik.errors.name)}
            style={{
              height: '14px',
              marginTop: 0,
              marginBottom: '4px',
              padding: 0,
              fontSize: '12px',
              visibility:
                formik.touched.name && formik.errors.name
                  ? 'visible'
                  : 'hidden',
            }}
          >
            {formik.errors.name}
          </FormHelperText>
        </FormControl>

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
              marginBottom: '4px',
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

        <FormControl sx={{ width: '100%' }} variant="standard">
          <InputLabel
            htmlFor="standard-adornment-password"
            size="small"
            error={Boolean(
              formik.touched.confirmPassword && formik.errors.confirmPassword
            )}
          >
            {t('confirmPassword')}
          </InputLabel>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            size="small"
            error={Boolean(
              formik.touched.confirmPassword && formik.errors.confirmPassword
            )}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={t('confirmPassword')}
          />
          <FormHelperText
            error={Boolean(
              formik.touched.confirmPassword && formik.errors.confirmPassword
            )}
            style={{
              height: '14px',
              marginTop: 0,
              marginBottom: '16px',
              padding: 0,
              fontSize: '12px',
              visibility:
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? 'visible'
                  : 'hidden',
            }}
          >
            {formik.errors.confirmPassword}
          </FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained" className={css.form__button}>
          {t('signUp')}
        </Button>
        <Link to="/" className={css.form__link}>
          {t('signUpNotification')}
        </Link>
      </ThemeProvider>
    </form>
  );
};
