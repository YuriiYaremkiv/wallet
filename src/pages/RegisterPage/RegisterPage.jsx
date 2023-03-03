import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'components/Loader/Loader';
import { FormContainer } from 'block/FormContainer/FormContainer';
import { FormRegister } from 'components/FormRegister/FormRegister';
import { useTranslation } from 'react-i18next';
import modeConfig from 'configs/mode.config';
import css from './RegisterPage.module.scss';

export const RegisterPage = () => {
  const { themeMode } = useSelector(state => state.themeMode);
  const isLoading = useSelector(state => state.auth.isLoading);
  const error = useSelector(state => state.auth.error);
  const { t } = useTranslation();
  const styles = modeConfig.style[themeMode];

  return (
    <section className={css[`section__${themeMode}`]}>
      <div className={css[`section__container__${themeMode}`]}>
        <div className="container">
          <div className={css.page__img}></div>
          <h1 style={{ ...styles.textColor }} className={css.page__title}>
            {t('title')}
          </h1>
          <div className={css.page__modal}>
            <FormContainer error={error}>
              <FormRegister />
            </FormContainer>
          </div>
          <Suspense fallback={<Loader />}></Suspense>
        </div>
      </div>
      {isLoading && <Loader />}
    </section>
  );
};
