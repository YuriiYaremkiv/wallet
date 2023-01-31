import { useField } from 'formik';
import css from './MyTextInput.module.scss';

export const MyTextInput = ({ icon, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={css.label}>
        <input className={css.input} {...field} {...props} />
        <svg className={css.icon}>
          <use href={icon}></use>
        </svg>
      </label>
      <div className={css.error}>
        {meta.touched && meta.error && (
          <p className={css.message}>{meta.error}</p>
        )}
      </div>
    </>
  );
};
