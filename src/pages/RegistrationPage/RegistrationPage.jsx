import styles from './RegistrationPage.module.scss';
import RegForm from './RegForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';
import translation from '../../assets/translation/register.json';
import { translationSelector } from 'redux/translation/translationSelectors';

import { RegisterForm } from 'components/RegisterForm/RegisterForm';

const RegistrationPage = () => {
  const language = useSelector(translationSelector);
  const isLoading = useSelector(selectIsloadingLogin);
  return (
    <div className={styles.registration_page}>
      <LanguageToggler />
      <div className="container">
        <h1 className={styles.title}>{translation[language].title}</h1>
        <RegForm />
        <Suspense fallback={<Loader />}></Suspense>
        <h1>Register Form</h1>
        <RegisterForm />
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default RegistrationPage;
