import styles from './LoginPage.module.css';
import LoginForm from './LoginForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';
import translation from '../../assets/translation/register.json';
import { translationSelector } from 'redux/translation/translationSelectors';

const LoginPage = () => {
  const language = useSelector(translationSelector);
  const isLoading = useSelector(selectIsloadingLogin);
  return (
    <div className={styles.registration_page}>
      <LanguageToggler />
      <div className="container">
        <h1 className={styles.title}>{translation[language].title}</h1>
        <div className={styles.form_wrapper}>
          <div className={styles.title_wrapper}>
            <img
              className={styles.wallet_img}
              src={require('../RegisterPage/images/icon.png')}
              alt="wallet"
            />
            <h2 className={styles.form_title}>
              {translation[language].form_title}
            </h2>
          </div>

          <div className={styles.form}>
            <div className={styles.input_wrapper}>
              <LoginForm />
            </div>
          </div>
        </div>
        <Suspense fallback={<Loader />}></Suspense>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default LoginPage;
