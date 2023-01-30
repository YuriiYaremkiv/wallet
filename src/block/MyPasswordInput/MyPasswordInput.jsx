import { useField } from 'formik';
import css from './MyPasswordInput.module.scss';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

export const MyPasswordInput = ({
  label,
  icon,
  password,
  changeShowPasswordFunc,
  children,
  showPassword,
  ...props
}) => {
  const handleShowPassword = () => {
    changeShowPasswordFunc(!showPassword);
  };
  const [field, meta] = useField(props);

  return (
    <>
      <label className={css.label}>
        <input className={css.input} {...field} {...props} />
        <svg className={css.icon}>
          <use href={icon}></use>
        </svg>
        <div className={css.passwordIcon}>
          <IconButton onClick={handleShowPassword} className={css.fjksdhfjsdf}>
            {showPassword ? (
              <VisibilityOff className={css.showIcon} />
            ) : (
              <Visibility className={css.showIcon} />
            )}
          </IconButton>
        </div>
      </label>
      <div className={css.children}>{children}</div>
      <div className={css.error}>
        {meta.touched && meta.error && <p>{meta.error}</p>}
      </div>
    </>
  );
};
