import styles from './LoginPage.module.scss';
import { LoginForm } from 'components/LoginForm/LoginForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';

import { FormContainer } from 'block/FormContainer/FormContainer';
import sprite from './icons/register-icons.svg';

export const LoginPage = () => {
  const isLoading = useSelector(selectIsloadingLogin);
  return (
    <div className={styles.registration_page}>
      <div className="container">
        <h1 className={styles.title}>Finance App</h1>
        <FormContainer title="Wallet" iconHref={sprite + '#wallet'}>
          <LoginForm />
        </FormContainer>
        <Suspense fallback={<Loader />}></Suspense>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};
