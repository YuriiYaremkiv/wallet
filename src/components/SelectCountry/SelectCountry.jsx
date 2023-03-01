import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import css from './SelectCountry.module.scss';

export const SelectCountry = () => {
  const { i18n } = useTranslation();
  const [type, setType] = useState(i18n.language);
  const { themeMode } = useSelector(state => state.themeMode);

  const handleChangeRadioButton = e => {
    setType(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  let stylesHorizontal = {};

  switch (type) {
    case 'en':
      stylesHorizontal.left = 0;
      stylesHorizontal.width = '60px';
      break;
    case 'ua':
      stylesHorizontal.left = 0;
      stylesHorizontal.width = '90px';
      stylesHorizontal.transform = 'translateX(60px)';
      break;
    default:
      return stylesHorizontal;
  }

  return (
    <div className={css[`selector__${themeMode}`]}>
      <label>
        <h3
          className={
            type === 'en'
              ? css[`activeTitle__${themeMode}`]
              : css[`disableTitle__${themeMode}`]
          }
        >
          EN
        </h3>
        <input
          type="radio"
          checked={type === 'en'}
          name="language"
          value="en"
          onChange={handleChangeRadioButton}
          className={css.select__input}
        />
      </label>
      <label
        style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <div className={css.flag}>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36">
            <rect width="36" height="36" fill="#005BBB" />
            <rect width="36" height="18" y="18" fill="#FFD500" />
          </svg>
        </div>
        <h3
          className={
            type === 'ua'
              ? css[`activeTitle__${themeMode}`]
              : css[`disableTitle__${themeMode}`]
          }
        >
          UA
        </h3>
        <input
          type="radio"
          checked={type === 'ua'}
          name="language"
          value="ua"
          onChange={handleChangeRadioButton}
          className={css.select__input}
        />
      </label>

      <div
        className={css[`backGroungHorizontal__${themeMode}`]}
        style={stylesHorizontal}
      ></div>
    </div>
  );
};
