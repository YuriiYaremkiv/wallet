import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Circles } from 'react-loader-spinner';
import css from './Currency.module.scss';

export const Currency = () => {
  const currency = useSelector(state => state.current.items);
  const { t } = useTranslation();

  return currency.length ? (
    <div className={css.container}>
      <ul className={css.list}>
        <div className={css.wrapper}></div>
        <li>
          <ul className={css.list__item}>
            <li className={css.list__value}>{t('currency')}</li>
            <li className={css.list__value}>USD</li>
            <li className={css.list__value}>EUR</li>
          </ul>
        </li>
        <li>
          <ul className={css.list__item}>
            <li className={css.list__value}>{t('purchase')}</li>
            <li className={css.list__value}>
              {currency[0].rateBuy.toFixed(2)}
            </li>
            <li className={css.list__value}>
              {currency[1].rateBuy.toFixed(2)}
            </li>
          </ul>
        </li>
        <li>
          <ul className={css.list__item}>
            <li className={css.list__value}>{t('sale')}</li>
            <li className={css.list__value}>
              {currency[0].rateSell.toFixed(2)}
            </li>
            <li className={css.list__value}>
              {currency[1].rateSell.toFixed(2)}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Circles
        height="30"
        width="30"
        color="#4A56E2"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};
