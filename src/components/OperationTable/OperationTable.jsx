import { useSelector } from 'react-redux';
import { BsFillTrashFill } from 'react-icons/bs';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';

import css from './OperationTable.module.scss';

import { CommentHover } from 'block/CommentHover/CommentHover';

export const OperationTable = ({ transactions, onDelete }) => {
  const categories = useSelector(selectTransactionCategories);
  const categoriesList = categories.map(data => data);
  const transactionsReverse = [...transactions];

  return (
    <div className={css.table}>
      <div className={css.scrollTable}>
        <table>
          <thead className={css.table__header}>
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
            {/* ********************************************** table  *********************************/}
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
                          {categoriesList.length &&
                            categoriesList.find(cat => cat.id === categoryId)
                              .name}
                        </td>
                        <td className={css.table__comment}>
                          {comment ? <CommentHover comment={comment} /> : '-'}
                        </td>
                        <td
                          className={amount > 0 ? css.positive : css.negative}
                        >
                          <p className={css.table__sum}>{amount.toFixed(2)}</p>
                        </td>
                        <td className={css.table__balance}>
                          {balanceAfter.toFixed(2)}
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
