import { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { nanoid } from '@reduxjs/toolkit';
import css from './DiagramTab.module.scss';
import {
  fetchTransactionsSummaryOfPeriod,
  fetchTransactionsSummary,
} from 'redux/transactions/transactionsOperations';
import { useSelector } from 'react-redux';
import { selectStatistic } from 'redux/transactions/transactionsSelectors';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import modeConfig from 'configs/mode.config';

ChartJS.register(ArcElement, Tooltip);

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

const DiagramTab = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const dispatch = useDispatch();
  const dataBASE = useSelector(selectStatistic);

  const [params, setParams] = useSearchParams();
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];
  const { t } = useTranslation();

  let DiagramaItem = null;
  let ExpenseSum = null;
  let TitleExpense = null;
  let visible = false;
  let data = null;

  if (dataBASE.categoriesSummary) {
    if (dataBASE.categoriesSummary.length !== 0) {
      visible = true;
    }

    DiagramaItem = dataBASE.categoriesSummary.filter(({ type }) =>
      type.includes('EXPENSE')
    );

    ExpenseSum = dataBASE.categoriesSummary
      .filter(({ type }) => type.includes('EXPENSE'))
      .map(({ total }) => Math.abs(total));

    TitleExpense = dataBASE.categoriesSummary
      .filter(({ type }) => type.includes('EXPENSE'))
      .map(({ name }) => name);

    data = {
      labels: [...TitleExpense],
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
      ],
      datasets: [
        {
          label: '# of Votes',
          data: [...ExpenseSum],
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
          ],
          borderWidth: 1,
        },
      ],
    };
  }

  useEffect(() => {
    dispatch(fetchTransactionsSummary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const month = params.get('month');
    const year = params.get('year');

    if (!month || !year) {
      return;
    }
    dispatch(fetchTransactionsSummaryOfPeriod({ month, year }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);
  // useEffect(() => {
  //   dispatch(fetchTransactionsSummaryOfPeriod({ month, year }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [month, year]);

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
      <h1 style={{ ...styles.textColor }} className={css.chart__title}>
        {t('statistics')}
      </h1>
      {/* Diagram - start */}
      {visible ? (
        <div className={css.schedule}>
          <Doughnut data={data} />
          <p style={{ ...styles.textColor }} className={css.schedule__income}>
            &#8372;{' '}
            {dataBASE.periodTotal
              ?.toFixed(2)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
          </p>
        </div>
      ) : (
        <p style={{ ...styles.textColor }}>{t('nothing')}</p>
      )}
      {/* Diagram - start */}

      {/* select - start */}

      <div className={css.chartItem}>
        <div className={css.select}>
          <select
            className={css.selectItem}
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
            className={css.selectItem}
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
        {/* select - eng */}

        {/* dsfsdlfsdfds */}
        <div className={css.chart}>
          <div className={css.title}>
            <div className={css.titleItem}>
              <p>{t('category')}</p>
              <p>{t('sum')}</p>
            </div>
          </div>
          {/* dsfsdlfsdfds */}
          {/* sdfjlsdlfjs;dflksdjflkdsjfk */}
          {visible ? (
            <ul className={css.list}>
              {DiagramaItem.map(({ name, total }, index) => (
                <li key={nanoid()} className={css.listItem}>
                  <div className={css.expenseItem}>
                    <p
                      style={{
                        width: 24,
                        height: 24,
                        backgroundColor: [data.color[index]],
                      }}
                    ></p>
                    <div className={css.expenseItemText}>
                      <span
                        style={{ ...styles.textColor }}
                        className={css.nameExpense}
                      >
                        {name}
                      </span>
                      <span style={{ ...styles.textColor }}>
                        {total
                          ?.toFixed(2)
                          .toString()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
                      </span>
                    </div>
                  </div>
                  <div className={css.separator}></div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={css.ListEmpty}>{t('list')}</p>
          )}
          {/* dsfhsdkfskdjfksdfhksdjfhksjdfhjsd */}
          <div className={css.totalList}>
            <p className={css.totalListItem}>
              <span style={{ ...styles.textColor }} className={css.result}>
                {t('expenses')}
              </span>
              <span className={css.exp}>
                {dataBASE.expenseSummary
                  ?.toFixed(2)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
              </span>
            </p>
            <p className={css.totalListItem}>
              <span style={{ ...styles.textColor }} className={css.result}>
                {t('income')}
              </span>
              <span className={css.income}>
                {' '}
                {dataBASE.incomeSummary
                  ?.toFixed(2)
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramTab;

// const DiagramTab = () => {
//   const today = new Date();
//   const month = today.getMonth();
//   const year = today.getFullYear();
//   // const [month, setMonth] = useState(today.getMonth());
//   // const [year, SetYear] = useState(today.getFullYear());
//   const dispatch = useDispatch();
//   const dataBASE = useSelector(selectStatistic);

//   const [params, setParams] = useSearchParams();
//   const { themeMode } = useSelector(state => state.themeMode);
//   const styles = modeConfig.style[themeMode];
//   const { t } = useTranslation();

//   let DiagramaItem = null;
//   let ExpenseSum = null;
//   let TitleExpense = null;
//   let visible = false;
//   let data = null;

//   if (dataBASE.categoriesSummary) {
//     if (dataBASE.categoriesSummary.length !== 0) {
//       visible = true;
//     }

//     DiagramaItem = dataBASE.categoriesSummary.filter(({ type }) =>
//       type.includes('EXPENSE')
//     );

//     ExpenseSum = dataBASE.categoriesSummary
//       .filter(({ type }) => type.includes('EXPENSE'))
//       .map(({ total }) => Math.abs(total));

//     TitleExpense = dataBASE.categoriesSummary
//       .filter(({ type }) => type.includes('EXPENSE'))
//       .map(({ name }) => name);

//     data = {
//       labels: [...TitleExpense],
//       color: [
//         '#FED057',
//         '#FFD8D0',
//         '#FD9498',
//         '#C5BAFF',
//         '#6E78E8',
//         '#4A56E2',
//         '#81E1FF',
//         '#24CCA7',
//         '#00AD84',
//       ],
//       datasets: [
//         {
//           label: '# of Votes',
//           data: [...ExpenseSum],
//           backgroundColor: [
//             '#FED057',
//             '#FFD8D0',
//             '#FD9498',
//             '#C5BAFF',
//             '#6E78E8',
//             '#4A56E2',
//             '#81E1FF',
//             '#24CCA7',
//             '#00AD84',
//           ],
//           borderColor: [
//             '#FED057',
//             '#FFD8D0',
//             '#FD9498',
//             '#C5BAFF',
//             '#6E78E8',
//             '#4A56E2',
//             '#81E1FF',
//             '#24CCA7',
//             '#00AD84',
//           ],
//           borderWidth: 1,
//         },
//       ],
//     };
//   }

//   useEffect(() => {
//     dispatch(fetchTransactionsSummary());
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     const month = params.get('month');
//     const year = params.get('year');

//     if (!month || !year) {
//       return;
//     }
//     dispatch(fetchTransactionsSummaryOfPeriod({ month, year }));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [params]);
//   // useEffect(() => {
//   //   dispatch(fetchTransactionsSummaryOfPeriod({ month, year }));
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   // }, [month, year]);

//   const onChanged = el => {
//     switch (el.target.id) {
//       case 'month':
//         const mons = monthNumber.findIndex(
//           elment => elment.toLowerCase() === el.target.value
//         );
//         setParams({ month: mons + 1, year });
//         break;
//       case 'year':
//         setParams({ month, year: el.target.value });
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className={css.statisticChart}>
//       <h1 style={{ ...styles.textColor }} className={css.diagramTitle}>
//         {t('statistics')}
//       </h1>
//       {/* Diagram - start */}
//       {visible ? (
//         <>
//           <div className={css.schedule}>
//             <Doughnut data={data} />
//           </div>
//           <p style={{ ...styles.textColor }} className={css.incomeSum}>
//             <span>
//               &#8372;
//               {dataBASE.periodTotal
//                 ?.toFixed(2)
//                 .toString()
//                 .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
//             </span>
//           </p>
//         </>
//       ) : (
//         <p>{t('nothing')}</p>
//       )}
//       {/* Diagram - start */}

//       <div className={css.chartItem}>
//         <div className={css.select}>
//           <select
//             className={css.selectItem}
//             name="month"
//             id="month"
//             defaultValue={month}
//             onChange={onChanged}
//           >
//             <option value="january"> {t('january')}</option>
//             <option value="february">{t('february')}</option>
//             <option value="march">{t('march')}</option>
//             <option value="april">{t('april')}</option>
//             <option value="may">{t('may')}</option>
//             <option value="june">{t('june')}</option>
//             <option value="july"> {t('july')}</option>
//             <option value="august"> {t('august')}</option>
//             <option value="september">{t('september')}</option>
//             <option value="october"> {t('october')}</option>
//             <option value="november">{t('november')}</option>
//             <option value="december">{t('december')}</option>
//           </select>
//           <select
//             className={css.selectItem}
//             name="year"
//             id="year"
//             defaultValue={year}
//             onChange={onChanged}
//           >
//             <option value="2019">2019</option>
//             <option value="2020">2020</option>
//             <option value="2021">2021</option>
//             <option value="2022">2022</option>
//             <option value="2023">2023</option>
//             <option value="2024">2024</option>
//             <option value="2025">2025</option>
//             <option value="2026">2026</option>
//             <option value="2027">2027</option>
//             <option value="2028">2028</option>
//             <option value="2029">2029</option>
//           </select>
//         </div>
//         <div className={css.chart}>
//           <div className={css.title}>
//             <div className={css.titleItem}>
//               <p>{t('category')}</p>
//               <p>{t('sum')}</p>
//             </div>
//           </div>
//           {visible ? (
//             <ul className={css.list}>
//               {DiagramaItem.map(({ name, total }, index) => (
//                 <li key={nanoid()} className={css.listItem}>
//                   <div className={css.expenseItem}>
//                     <p
//                       style={{
//                         width: 24,
//                         height: 24,
//                         backgroundColor: [data.color[index]],
//                       }}
//                     ></p>
//                     <div className={css.expenseItemText}>
//                       <span
//                         style={{ ...styles.textColor }}
//                         className={css.nameExpense}
//                       >
//                         {name}
//                       </span>
//                       <span style={{ ...styles.textColor }}>
//                         {total
//                           ?.toFixed(2)
//                           .toString()
//                           .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
//                       </span>
//                     </div>
//                   </div>
//                   <div className={css.separator}></div>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className={css.ListEmpty}>{t('list')}</p>
//           )}
//           <div className={css.totalList}>
//             <p className={css.totalListItem}>
//               <span style={{ ...styles.textColor }} className={css.result}>
//                 {t('expenses')}
//               </span>
//               <span className={css.exp}>
//                 {dataBASE.expenseSummary
//                   ?.toFixed(2)
//                   .toString()
//                   .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
//               </span>
//             </p>
//             <p className={css.totalListItem}>
//               <span style={{ ...styles.textColor }} className={css.result}>
//                 {t('income')}
//               </span>
//               <span className={css.income}>
//                 {' '}
//                 {dataBASE.incomeSummary
//                   ?.toFixed(2)
//                   .toString()
//                   .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')}
//               </span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
