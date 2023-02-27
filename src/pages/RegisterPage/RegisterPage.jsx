import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from 'components/Loader/Loader';
import { FormContainer } from 'block/FormContainer/FormContainer';
import { SelectCountry } from 'components/SelectCountry/SelectCountry';
import { FormRegister } from 'components/FormRegister/FormRegister';
import { ChangeMode } from 'components/ChangeMode/ChangeMode';
import { selectIsloadingLogin } from 'redux/auth/authSelectors';
import { useTranslation } from 'react-i18next';
import modeConfig from 'configs/mode.config';
import css from './RegisterPage.module.scss';

export const RegisterPage = () => {
  const { themeMode } = useSelector(state => state.themeMode);
  const isLoading = useSelector(selectIsloadingLogin);
  const { t } = useTranslation();
  const styles = modeConfig.style[themeMode];

  return (
    <section className={css[`section__${themeMode}`]}>
      <div className={css[`section__container__${themeMode}`]}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              padding: '10px 0',
            }}
          >
            <SelectCountry />
            <ChangeMode />
          </div>
          <div className={css.page__img}></div>
          <h1 style={{ ...styles.textColor }} className={css.page__title}>
            {t('title')}
          </h1>
          <div className={css.page__modal}>
            <FormContainer>
              <FormRegister />
            </FormContainer>
          </div>
          <Suspense fallback={<Loader />}></Suspense>
          {isLoading && <Loader />}
        </div>
      </div>
    </section>
  );
};
