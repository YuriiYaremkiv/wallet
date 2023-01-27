import { useSelector } from 'react-redux';

import css from './Header.module.scss';
import sprite from '../../images/icons/icons.svg';

import { LogOutForm } from 'components/LogOutForm/LogOutForm';

export const Header = () => {
  const userName = useSelector(state => state.auth.user.username);

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.header__container}>
          <div className={css.logo}>
            <svg className={css.logo__icon}>
              <use href={sprite + '#wallet'}></use>
            </svg>
            <span className={css.logo__text}>Wallet</span>
          </div>
          <div className={css.menu}>
            <span className={css.menu__name}>{userName}</span>
            <LogOutForm>
              <svg className={css.menu__exitIcon}>
                <use href={sprite + '#exit'}></use>
              </svg>
            </LogOutForm>
          </div>
        </div>
      </div>
    </header>
  );
};
