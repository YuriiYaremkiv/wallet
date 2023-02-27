import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import modeConfig from 'configs/mode.config';
import css from './SelectCountry.module.scss';
import Button from '@mui/material/Button';

export const SelectCountry = () => {
  const { i18n } = useTranslation();
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];

  const handleChangeLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ua' : 'en');
  };

  return (
    <Button
      onClick={handleChangeLanguage}
      style={{ ...styles.textColor }}
      className={css.button}
    >
      <p className={css.select__text}>{i18n.language === 'en' ? 'ua' : 'en'}</p>
    </Button>
  );
};
