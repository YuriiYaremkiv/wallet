import { useSelector } from 'react-redux';
import { LogOutForm } from 'components/LogOutForm/LogOutForm';
import { useTranslation } from 'react-i18next';
import { ChangeMode } from 'components/ChangeMode/ChangeMode';
import { SelectCountry } from 'components/SelectCountry/SelectCountry';
import sprite from '../../images/icons/icons.svg';
import modeConfig from 'configs/mode.config';
import css from './Header.module.scss';

export const Header = () => {
  const userName = useSelector(state => state.auth.user.username);
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];
  const { t } = useTranslation();

  return (
    <header className={css.header} style={{ ...styles.backgroundColorHeader }}>
      <div className="container">
        <div className={css.header__container}>
          <div className={css.logo}>
            <svg className={css.logo__icon}>
              <use href={sprite + '#wallet'}></use>
            </svg>
            <span style={{ ...styles.textColor }} className={css.logo__text}>
              {t('title')}
            </span>
          </div>
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
          <div className={css.menu}>
            <span style={{ ...styles.textColor }} className={css.menu__name}>
              {userName}
            </span>
            <LogOutForm>
              <svg
                style={{ ...styles.textColor }}
                className={css.menu__exitIcon}
              >
                <use href={sprite + '#exit'}></use>
              </svg>
            </LogOutForm>
          </div>
        </div>
      </div>
    </header>
  );
};
