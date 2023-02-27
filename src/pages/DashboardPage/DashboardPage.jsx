import { Outlet } from 'react-router-dom';
import { Balance } from 'components/Balance/Balance';
import { Header } from 'components/Header/Header';
import { Navigation } from 'components/Navigation/Navigation';
import { Loader } from 'components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { Suspense, useEffect } from 'react';
import { selectIsLoading } from 'redux/transactions/transactionsSelectors';
import { Currency } from 'components/Currency/Currency';
import Media from 'react-media';
import { fetchTransactions } from 'redux/transactions/transactionsOperations';
import { fetchTransactionCategories } from 'redux/transactions/transactionsOperations';
import { getCurrencyRate } from 'redux/currency/currencyOperations';

import css from './DashboardPage.module.scss';

const DashboardPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrencyRate());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTransactionCategories());
  }, [dispatch]);

  return (
    <section className={css.section}>
      <div className={css.dashboard__wrapper}>
        <Header />
        <div className="container">
          <div className={css.dashboard__content}>
            <div className={css.dashboard__nav}>
              <div>
                <Navigation />
                <Balance />
              </div>
              <div className={css.dashboard__currency}>
                <Media query="(min-width:768px)" render={() => <Currency />} />
              </div>
              <Suspense fallback={<Loader />}></Suspense>
            </div>
            <div className={css.dashboard__tab}>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <Loader />}
    </section>
  );
};

export default DashboardPage;
