import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Balance } from 'components/Balance/Balance';
import { Header } from 'components/Header/Header';
import { Navigation } from 'components/Navigation/Navigation';
import { Loader } from 'components/Loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsLoading } from 'redux/transactions/transactionsSelectors';
import { Currency } from 'components/Currency/Currency';
import Media from 'react-media';
import { fetchTransactions } from 'redux/transactions/transactionsOperations';
import { fetchTransactionCategories } from 'redux/transactions/transactionsOperations';
import { getCurrencyRate } from 'redux/currency/currencyOperations';
import modeConfig from 'configs/mode.config';
import css from './DashboardPage.module.scss';
import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';

const DashboardPage = () => {
  const isLoading = useSelector(selectIsLoading);
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];

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
    <>
      <Header />
      <main style={{ ...styles.backgroundColorMain }} className={css.main}>
        <section
          style={{ ...styles.backgroundColorBlur, position: 'relative' }}
          className={css.section}
        >
          <div className="container">
            <div className={css.container}>
              <div className={css.block1}>
                <div className={css.block1__item1}>
                  <Navigation />
                  <Balance />
                </div>
                <div className={css.block1__item2}>
                  <Media
                    query="(min-width:768px)"
                    render={() => <Currency />}
                  />
                </div>
              </div>
              <div className={css.block2}>
                <Outlet />
              </div>
            </div>
          </div>
          {isLoading && <Loader />}
          <Suspense fallback={<Loader />}></Suspense>
          <ButtonAddTransactions />
        </section>
      </main>
    </>
  );
};

export default DashboardPage;
