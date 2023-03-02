import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { logOut } from 'redux/auth/authOperations';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import modeConfig from 'configs/mode.config';
import css from './LogOutForm.module.scss';

export const LogOutForm = () => {
  const dispatch = useDispatch(logOut);
  const user = useSelector(state => state.auth.user.username);
  const [modalShown, setModalShown] = useState(false);
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];
  const { t } = useTranslation();

  const handleClick = () => {
    setModalShown(true);
  };
  return (
    <div className={css.container}>
      <p style={{ ...styles.textColor }} className={css.user}>{`${t(
        'hi'
      )}${user}!`}</p>
      <button onClick={handleClick} className={css.buttonLogout} type="button">
        <LogoutIcon style={{ ...styles.textColor }} className={css.icon} />
      </button>

      {modalShown && (
        <div className={css.backdrop}>
          <div className={css.modal}>
            <p className={css.text}>{t('wantExit')}</p>
            <Button
              variant="outlined"
              onClick={() => setModalShown(false)}
              className={css.button}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(logOut());
                setModalShown(false);
              }}
              className={css.buttonExit}
            >
              {t('exit')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
