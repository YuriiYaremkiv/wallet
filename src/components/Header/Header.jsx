import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './Header.module.scss';
import logoImage from './images/wallet-logo.png';
import LogoutFeature from 'components/LogoutFeature/LogoutFeature';
import LanguageToggler from 'components/LanguageToggler/LanguageToggler';
import translation from 'assets/translation/header.json';
import { translationSelector } from 'redux/translation/translationSelectors';

import sprite from '../../images/icons/icons.svg';

const Header = () => {
  const language = useSelector(translationSelector);
  const userName = useSelector(state => state.auth.user.username);

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header__container}>
          <span className={css.header__logo__text}>
            <svg className={css.header__icon}>
              <use href={sprite + '#wallet'}></use>
            </svg>
            {translation[language].wallet}
          </span>

          <div className={css.header__menu}>
            <div style={{ display: 'flex', gap: 8 }}>
              <span className={css.header__menu__name}>{userName}</span>
              <LogoutFeature />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
