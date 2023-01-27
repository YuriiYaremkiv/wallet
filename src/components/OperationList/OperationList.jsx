import { useSelector } from 'react-redux';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';

import css from './OperationList.module.scss';

export const OperationList = ({ transactions, onDelete }) => {
  const categories = useSelector(selectTransactionCategories);
  const categoriesList = categories.map(data => data);
  const operations = [...transactions];

  return (
    <div className={css.tableWrapMob}>
      <div className={css.scrollTableMob}>
        <div className={css.scrollTableBodyMob}>
          {transactions.length !== 0 ? (
            operations.map(operation => (
              <table
                className={
                  operation.amount > 0 ? css.tablePositive : css.tableNegative
                }
                key={operation.id}
              >
                <tbody>
                  <tr>
                    <td>Date</td>
                    <td>
                      {new Date(operation.transactionDate)
                        .toLocaleDateString()
                        .split('.')
                        .join('-')}
                    </td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>{operation.type !== 'EXPENSE' ? '+' : '-'}</td>
                  </tr>

                  <tr>
                    <td>Category</td>
                    <td>
                      {categoriesList.length &&
                        categoriesList.find(
                          cat => cat.id === operation.categoryId
                        ).name}
                    </td>
                  </tr>
                  <tr>
                    <td>Comment</td>
                    <td>{operation.comment || '-'}</td>
                  </tr>
                  <tr>
                    <td>Sum</td>
                    <td>{operation.amount}</td>
                  </tr>
                  <tr>
                    <td>Balance</td>
                    <td>{operation.balanceAfter}</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <button
                        type="button"
                        className={css.scrollTableBtnMob}
                        onClick={() => onDelete(operation.id, operation.amount)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            ))
          ) : (
            <p className={css.noTransactionMob}>No transactions</p>
          )}
        </div>
      </div>
    </div>
  );
};
