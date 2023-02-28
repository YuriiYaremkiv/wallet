import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import css from './Balance.module.scss';

export const Balance = () => {
  const userBalance = useSelector(state => state.auth.user.balance);
  const { t } = useTranslation();

  const balance = userBalance
    .toFixed(2)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');

  return (
    <div className={css.balance}>
      <p className={css.balance__title}>{t('yourBalance')}</p>
      <p className={css.balance__sum}>{balance} $</p>
    </div>
  );
};
