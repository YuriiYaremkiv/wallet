import { useField } from 'formik';
import css from './MyTextInput.module.scss';

export const MyTextInput = ({ label, icon, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={css.MyTextInput}>
      <div className={css.MyTextInput__container}>
        <input className={css.MyTextInput__input} {...field} {...props} />
        <svg className={css.MyTextInput__icon} width="24" height="24">
          <use href={icon}></use>
        </svg>
        <div className={css.MyTextInput__children}>{children}</div>
      </div>
      {meta.touched && meta.error ? (
        <div className={css.MyTextInput__error}>{meta.error}</div>
      ) : null}
    </div>
  );
};
