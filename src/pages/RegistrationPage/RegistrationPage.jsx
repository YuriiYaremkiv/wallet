import styles from './RegistrationPage.module.scss';
import css from './RegistrationPage.module.scss';

import RegForm from './RegForm';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';
import translation from '../../assets/translation/register.json';
import { translationSelector } from 'redux/translation/translationSelectors';

import { MdEmail } from 'react-icons/md';

const RegistrationPage = () => {
  const language = useSelector(translationSelector);
  const isLoading = useSelector(selectIsloadingLogin);

  return (
    <div className={css.registration_page}>
      <LanguageToggler />
      <div className="container">
        <h1 className={css.title}>{translation[language].title}</h1>
        <div className={css.form_wrapper}>
          <div className={css.title_wrapper}>
            <img
              className={css.wallet_img}
              src={require('./images/icon.png')}
              alt="wallet"
            />
            <h1>fgdrfgfdg</h1>
            <h2 className={css.form_title}>
              {translation[language].form_title}
            </h2>
          </div>

          <div className={css.form}>
            <div className={css.input_wrapper}>
              <MdEmail className={css.ico} />
              <RegForm />
            </div>
          </div>
        </div>
        <Suspense fallback={<Loader />}></Suspense>
      </div>
      {isLoading && <Loader />}
    </div>
  );
};

export default RegistrationPage;
