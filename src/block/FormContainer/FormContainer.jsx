import sprite from './icons/register-icons.svg';
import css from './FormContainer.module.scss';

export const FormContainer = ({ title = 'Wallet', children, error = '' }) => {
  return (
    <div className={css.FormContainer}>
      <div className={css.FormContainer__container}>
        <svg className={css.registrationPage__icon} width="40" height="40">
          <use href={`${sprite + '#wallet'}`}></use>
        </svg>
        <h2 className={css.FormContainer__title}>{title}</h2>
      </div>
      {children}
      {error && <p className={css.error}>{error}</p>}
    </div>
  );
};
