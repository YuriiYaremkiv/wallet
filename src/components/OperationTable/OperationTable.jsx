import { useSelector } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';

import css from './OperationTable.module.scss';

export const OperationTable = ({ transactions, onDelete }) => {
  const categories = useSelector(selectTransactionCategories);
  const categoriesList = categories.map(data => data);
  const transactionsReverse = [...transactions];

  return (
    <div className={css.tableWrap}>
      <div className={css.scrollTable}>
        <table>
          <thead className={css.abraCadabra}>
            <tr>
              <th>Date</th>
              <th>Type </th>
              <th>Category</th>
              <th>Comment</th>
              <th>Sum</th>
              <th>Balance</th>
              <th></th>
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
                        <td>
                          {new Date(transactionDate)
                            .toLocaleDateString()
                            .split('.')
                            .join('-')}
                        </td>
                        <td>{type !== 'EXPENSE' ? '+' : '-'}</td>
                        <td>
                          {categoriesList.length &&
                            categoriesList.find(cat => cat.id === categoryId)
                              .name}
                        </td>
                        <td>{comment || '-'}</td>
                        <td
                          className={amount > 0 ? css.positive : css.negative}
                        >
                          {amount}
                        </td>
                        <td>{balanceAfter}</td>
                        <td>
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
                  <td>No transactions!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
