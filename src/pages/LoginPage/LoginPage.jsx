import { LoginForm } from 'components/LoginForm/LoginForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';

import { FormContainer } from 'block/FormContainer/FormContainer';

import css from './LoginPage.module.scss';
import sprite from './icons/register-icons.svg';

export const LoginPage = () => {
  const isLoading = useSelector(selectIsloadingLogin);
  return (
    <div className={css.RegisterPage}>
      <div className="container">
        <h1 className={css.RegisterPage__title}>Finance App</h1>
        <div className={css.RegisterPage__modal}>
          <FormContainer title="Wallet" iconHref={sprite + '#wallet'}>
            <LoginForm />
          </FormContainer>
        </div>
        <Suspense fallback={<Loader />}></Suspense>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};
