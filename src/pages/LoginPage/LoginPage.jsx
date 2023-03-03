import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'components/Loader/Loader';
import { FormContainer } from 'block/FormContainer/FormContainer';
import { FormLogin } from 'components/FormLogin/FormLogin';
import { useTranslation } from 'react-i18next';
import modeConfig from 'configs/mode.config';
import css from './LoginPage.module.scss';

export const LoginPage = () => {
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];
  const { t } = useTranslation();

  return (
    <section className={css[`section__${themeMode}`]}>
      <div className={css[`section__container__${themeMode}`]}>
        <div className="container">
          <div className={css.page__img}></div>
          <div className={css.page__modal}>
            <h1 style={{ ...styles.textColor }} className={css.page__title}>
              {t('title')}
            </h1>
            <FormContainer error={error}>
              <FormLogin />
            </FormContainer>
          </div>
          <Suspense fallback={<Loader />}></Suspense>
        </div>
      </div>
      {isLoading && <Loader />}
    </section>
  );
};
