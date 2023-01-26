import css from './Button.module.scss';

export const Button = ({ title = 'SEND' }) => {
  return (
    <button className={css.RegisterForm__Btn} type="submit">
      {title}
    </button>
  );
};
