import { useState } from 'react';
import { useField } from 'formik';
import css from './MyTextInput.module.scss';

import VisibilityIcon from '@mui/icons-material/Visibility';

export const MyTextInput = ({
  label,
  icon,
  password,
  changeShowPasswordFunc,
  children,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
    changeShowPasswordFunc(showPassword);
  };

  const [field, meta] = useField(props);
  return (
    <div className={css.MyTextInput}>
      <div className={css.MyTextInput__container}>
        <input className={css.MyTextInput__input} {...field} {...props} />
        <svg className={css.MyTextInput__icon} width="24" height="24">
          <use href={icon}></use>
        </svg>
        {password && (
          <VisibilityIcon
            onClick={handleShowPassword}
            className={css.MyTextInput__ShowPassword}
          />
        )}
        <div className={css.MyTextInput__children}>{children}</div>
      </div>
      {meta.touched && meta.error ? (
        <div className={css.MyTextInput__error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
