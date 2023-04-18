import { useSelector } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { CommentHover } from 'block/CommentHover/CommentHover';
import { useTranslation } from 'react-i18next';
import modeConfig from 'configs/mode.config';
import css from './OperationTable.module.scss';

function formatNumber(value) {
  const formattedValue = value
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  return formattedValue;
}

export const OperationTable = ({ transactions, onDelete }) => {
  const categories = useSelector(
    state => state.transactions.transactionCategories.items
  );
  const categoriesList = categories.map(data => data);
  const transactionsReverse = [...transactions];
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];
  const { t } = useTranslation();

  return (
    <div
      className={css.table}
      style={{
        ...styles.backgroundColorThree,
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
      }}
    >
      <div className={css.scrollTable}>
        <table>
          <thead className={css.table__header} style={{ ...styles.textColor }}>
            <tr>
              <th style={{ ...styles.backgroundColorAccent }}>{t('date')}</th>
              <th style={{ ...styles.backgroundColorAccent }}>{t('type')}</th>
              <th style={{ ...styles.backgroundColorAccent }}>
                {t('category')}
              </th>
              <th style={{ ...styles.backgroundColorAccent }}>
                {t('comment')}
              </th>
              <th style={{ ...styles.backgroundColorAccent }}>{t('sum')}</th>
              <th style={{ ...styles.backgroundColorAccent }}>
                {t('balance')}
              </th>
              <th style={{ ...styles.backgroundColorAccent }}></th>
            </tr>
          </thead>
        </table>
        <div className={css.scrollTableBody}>
          <table>
            <tbody>
              {transactions.length ? (
                transactionsReverse
                  .reverse()
                  .sort(
                    (a, b) =>
                      new Date(b.transactionDate) - new Date(a.transactionDate)
                  )
                  .map(
                    ({
                      id,
                      type,
                      transactionDate,
                      categoryId,
                      comment,
                      amount,
                      balanceAfter,
                    }) => (
                      <tr key={id}>
                        <td className={css.table__date}>{transactionDate}</td>
                        <td className={css.table__type}>
                          {type !== 'EXPENSE' ? '+' : '-'}
                        </td>
                        <td className={css.table__category}>
                          {t(
                            `${
                              categoriesList.length &&
                              categoriesList
                                .find(cat => cat.id === categoryId)
                                .name.toLowerCase()
                            }`
                          )}
                        </td>
                        <td className={css.table__comment}>
                          {comment ? <CommentHover comment={comment} /> : '-'}
                        </td>
                        <td
                          className={amount > 0 ? css.positive : css.negative}
                        >
                          <p className={css.table__sum}>
                            {formatNumber(amount)}
                          </p>
                        </td>
                        <td className={css.table__balance}>
                          {formatNumber(balanceAfter)}
                        </td>
                        <td className={css.table__btn}>
                          <button
                            type="button"
                            onClick={() => onDelete(id, amount)}
                            className={css.scrollTableBtn}
                          >
                            <BsFillTrashFill style={{ fill: '#fff' }} />
                          </button>
                        </td>
                      </tr>
                    )
                  )
              ) : (
                <tr>
                  <td>{t('noTransactions')}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
