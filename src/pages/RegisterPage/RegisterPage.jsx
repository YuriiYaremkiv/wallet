import css from './RegisterPage.module.scss';

import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';

import sprite from './icons/register-icons.svg';
import { FormContainer } from 'block/FormContainer/FormContainer';

export const RegisterPage = () => {
  const isLoading = useSelector(selectIsloadingLogin);

  return (
    <div className={css.RegisterPage}>
      <div className="container">
        <div className={css.RegisterPage__img}></div>
        <h1 className={css.RegisterPage__title}>Finance App</h1>
        <div className={css.RegisterPage__modal}>
          <FormContainer title="Wallet" iconHref={sprite + '#wallet'}>
            <RegisterForm />
          </FormContainer>
        </div>
        <Suspense fallback={<Loader />}></Suspense>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};
