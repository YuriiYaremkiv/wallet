import { useSelector } from 'react-redux';

import css from './Balance.module.scss';

export const Balance = () => {
  const userBalance = useSelector(state => state.auth.user.balance);
  const balance = userBalance
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

  return (
    <div className={css.balance}>
      <span className={css.balance__title}>YOUR BALANCE</span>
      <p className={css.balance__sum}>
        <span>{balance} $</span>
      </p>
    </div>
  );
};
