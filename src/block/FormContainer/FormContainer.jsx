import css from './FormContainer.module.scss';

export const FormContainer = ({ title, iconHref, children }) => {
  return (
    <div className={css.FormContainer}>
      <div className={css.FormContainer__container}>
        <svg className={css.registrationPage__icon} width="40" height="40">
          <use href={iconHref}></use>
        </svg>
        <h2 className={css.FormContainer__title}>{title}</h2>
      </div>
      {children}
    </div>
  );
};
