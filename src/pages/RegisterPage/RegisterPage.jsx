import css from './RegisterPage.module.scss';

import { RegisterForm } from './RegisterForm';
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
        <h1 className={css.RegisterPage__title}>Finance App</h1>
        <FormContainer title="Wallet" iconHref={sprite + '#wallet'}>
          <RegisterForm />
        </FormContainer>
        This is now
        <Suspense fallback={<Loader />}></Suspense>
        {isLoading && <Loader />}
      </div>
    </div>
  );
};
