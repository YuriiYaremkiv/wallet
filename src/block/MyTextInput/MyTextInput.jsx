import { useField } from 'formik';
import css from './MyTextInput.module.scss';

export const MyTextInput = ({ label, icon, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className={css.MyText}>
      <div className={css.MyText__container}>
        <input className={css.MyText__input} {...field} {...props} />
        <svg className={css.MyText__icon} width="24" height="24">
          <use href={icon}></use>
        </svg>
      </div>
      {meta.touched && meta.error ? (
        <div className={css.MyText__error}>{meta.error}</div>
      ) : null}
      {children}
    </div>
  );
};
