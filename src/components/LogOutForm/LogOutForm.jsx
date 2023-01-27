import { logOut } from 'redux/auth/authOperations';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import css from './LogOutForm.module.scss';

export const LogOutForm = ({ children }) => {
  const dispatch = useDispatch(logOut);
  const [modalShown, setModalShown] = useState(false);

  const handleClick = () => {
    setModalShown(true);
  };
  return (
    <>
      <button onClick={handleClick} className={css.button} type="button">
        {children}
      </button>

      {modalShown && (
        <div className={css.backdrop}>
          <div className={css.modal}>
            <p>Did you want to exit?</p>

            <button
              className={css.modal_btn}
              type="button"
              onClick={() => setModalShown(false)}
            >
              CANCEL
            </button>
            <button
              className={css.modal_btnExit}
              type="button"
              onClick={() => {
                dispatch(logOut());
                setModalShown(false);
              }}
            >
              EXIT
            </button>
          </div>
        </div>
      )}
    </>
  );
};
