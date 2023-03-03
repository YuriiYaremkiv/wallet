import { useSelector } from 'react-redux';
import sprite from '../../images/icons/icons.svg';
import modeConfig from 'configs/mode.config';
import css from './Logo.module.scss';

export const Logo = () => {
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];

  return (
    <div className={css.logo}>
      <svg className={css.icon}>
        <use href={sprite + '#wallet'}></use>
      </svg>
      <p style={{ ...styles.textColor }} className={css.text}>
        Finance<span className={css.text__accent}>App</span>
      </p>
    </div>
  );
};

export const LogoNotMode = () => {
  return (
    <div className={css.logo}>
      <svg className={css.icon}>
        <use href={sprite + '#wallet'}></use>
      </svg>
      <p className={css.text}>
        Finance<span className={css.text__accent}>App</span>
      </p>
    </div>
  );
};
