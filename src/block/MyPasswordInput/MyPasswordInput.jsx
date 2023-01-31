import { useField } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import css from './MyPasswordInput.module.scss';

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
        <input className={css.input} {...field} {...props} maxLength="35" />
        <svg className={css.icon}>
          <use href={icon}></use>
        </svg>
        <div className={css.passwordIcon}>
          <IconButton
            onClick={handleShowPassword}
            className={css.iconContainer}
          >
            {showPassword ? (
              <VisibilityOff className={css.showIcon} />
            ) : (
              <Visibility className={css.showIcon} />
            )}
          </IconButton>
        </div>
      </label>
      <div className={css.error}>
        <div className={css.children}>{children}</div>
        {meta.touched && meta.error && (
          <p className={css.message}>{meta.error}</p>
        )}
      </div>
    </>
  );
};
