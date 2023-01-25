import css from './RegistrationPage.module.scss';

import RegForm from './RegForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';

import sprite from './icons/register-icons.svg';

const RegistrationPage = () => {
  const isLoading = useSelector(selectIsloadingLogin);

  return (
    <div className={css.registrationPage}>
      <div className="container">
        <h1 className={css.registrationPage__title}>Finance App</h1>
        This is now
        <div className={css.registrationPage__form}>
          dfgdfg
          <div className={css.registrationPage__wrapper__title}>
            <svg className={css.registrationPage__img} width="40" height="40">
              <use href={sprite + '#wallet'}></use>
            </svg>
            <h2 className={css.registrationPage__form__title}>Wallet</h2>
          </div>
          <RegForm />
        </div>
        <Suspense fallback={<Loader />}></Suspense>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default RegistrationPage;
