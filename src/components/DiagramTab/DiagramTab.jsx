import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import css from './DiagramTab.module.scss';
import {
  fetchTransactionsSummaryOfPeriod,
  fetchTransactionsSummary,
} from 'redux/transactions/transactionsOperations';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import modeConfig from 'configs/mode.config';
ChartJS.register(ArcElement, Tooltip);

function formatNumber(value) {
  const formattedValue = value
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  return formattedValue;
}

const monthNumber = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DiagramTab = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useDispatch();
  const dataBASE = useSelector(state => state.transactions.summaryItems);
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];
  const { t } = useTranslation();

  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const allCategories = dataBASE.categoriesSummary.filter(
    ({ type }) => type === 'EXPENSE'
  );

  const data = {
    labels: [
      ...allCategories?.map(category => {
        return t(`${category.name.toLowerCase()}`);
      }),
    ],
    color: [
      '#FED057',
      '#FFD8D0',
      '#FD9498',
      '#C5BAFF',
      '#6E78E8',
      '#4A56E2',
      '#81E1FF',
      '#24CCA7',
      '#00AD84',
      '#D2B48C',
      '#008080',
      '#800080',
    ],
    datasets: [
      {
        label: t('totalExpence'),
        data: [...allCategories?.map(category => category.total)],
        backgroundColor: [
          '#FED057',
          '#FFD8D0',
          '#FD9498',
          '#C5BAFF',
          '#6E78E8',
          '#4A56E2',
          '#81E1FF',
          '#24CCA7',
          '#00AD84',
          '#D2B48C',
          '#008080',
          '#800080',
        ],
        borderColor: [
          '#FED057',
          '#FFD8D0',
          '#FD9498',
          '#C5BAFF',
          '#6E78E8',
          '#4A56E2',
          '#81E1FF',
          '#24CCA7',
          '#00AD84',
          '#D2B48C',
          '#008080',
          '#800080',
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    dispatch(fetchTransactionsSummary());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const month = params.get('month');
    const year = params.get('year');

    if (!month || !year) {
      return;
    }
    dispatch(fetchTransactionsSummaryOfPeriod({ month, year }));
    // eslint-disable-next-line
  }, [params]);

  const onChanged = el => {
    switch (el.target.id) {
      case 'month':
        const mons = monthNumber.findIndex(
          elment => elment.toLowerCase() === el.target.value
        );
        setParams({ month: mons + 1, year });
        break;
      case 'year':
        setParams({ month, year: el.target.value });
        break;
      default:
        break;
    }
  };

  return (
    <div className={css.chart}>
      <div className={css.block1}>
        <h1 style={{ ...styles.textColor }} className={css.chart__title}>
          {t('statistics')}
        </h1>

        {/* Diagram - start */}
        {allCategories.length ? (
          <div className={css.schedule}>
            <Doughnut data={data} />
            <p style={{ ...styles.textColor }} className={css.schedule__income}>
              &#8372; {formatNumber(dataBASE.periodTotal)}
            </p>
          </div>
        ) : (
          <p style={{ ...styles.textColor }}>{t('nothing')}</p>
        )}
        {/* Diagram - end */}
      </div>

      <div className={css.block2}>
        {/* Select month and year - start */}
        <div className={css.select}>
          <select
            className={css.select__item}
            name="month"
            id="month"
            defaultValue={month}
            onChange={onChanged}
          >
            <option value="january"> {t('january')}</option>
            <option value="february">{t('february')}</option>
            <option value="march">{t('march')}</option>
            <option value="april">{t('april')}</option>
            <option value="may">{t('may')}</option>
            <option value="june">{t('june')}</option>
            <option value="july"> {t('july')}</option>
            <option value="august"> {t('august')}</option>
            <option value="september">{t('september')}</option>
            <option value="october"> {t('october')}</option>
            <option value="november">{t('november')}</option>
            <option value="december">{t('december')}</option>
          </select>
          <select
            className={css.select__item}
            name="year"
            id="year"
            defaultValue={year}
            onChange={onChanged}
          >
            <option value="2019">2019</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
            <option value="2028">2028</option>
            <option value="2029">2029</option>
          </select>
        </div>
        {/* Select month and year - end */}

        {/* List of categories - start */}
        <div className={css.category}>
          <div className={css.category__title}>
            <p>{t('category')}</p>
            <p>{t('sum')}</p>
          </div>
          {allCategories.length ? (
            <ul className={css.list}>
              {allCategories.map(({ name, total }, index) => (
                <li key={name} className={css.list__item}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        backgroundColor: [data.color[index]],
                        borderRadius: '4px',
                      }}
                    ></div>
                    <p
                      style={{ ...styles.textColor }}
                      className={css.list__name}
                    >
                      {t(`${name.toLowerCase()}`)}
                    </p>
                  </div>
                  <p
                    style={{ ...styles.textColor }}
                    className={css.list__total}
                  >
                    {formatNumber(total)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={css.list__empty}>{t('list')}</p>
          )}
          {/* List of categories - end */}

          {/* Total balance - start */}
          <ul className={css.listTotal}>
            <li className={css.listTotal__item}>
              <p
                style={{ ...styles.textColor }}
                className={css.listTotal__result}
              >
                {t('expenses')}
              </p>
              <p className={css.listTotal__expense}>
                {formatNumber(dataBASE.expenseSummary)}
              </p>
            </li>
            <li className={css.listTotal__item}>
              <p
                style={{ ...styles.textColor }}
                className={css.listTotal__result}
              >
                {t('income')}
              </p>
              <p className={css.listTotal__income}>
                {formatNumber(dataBASE.incomeSummary)}
              </p>
            </li>
          </ul>
          {/* Total balance - end */}
        </div>
      </div>
    </div>
  );
};
