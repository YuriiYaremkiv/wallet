import { useSelector } from 'react-redux';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';

import css from './OperationList.module.scss';
import { CommentHover } from 'block/CommentHover/CommentHover';

export const OperationList = ({ transactions, onDelete }) => {
  const categories = useSelector(selectTransactionCategories);
  const categoriesList = categories.map(data => data);
  const operations = [...transactions];

  return (
    <div className={css.operations}>
      {transactions.length !== 0
        ? operations.map(
            ({
              id,
              transactionDate,
              type,
              categoryId,
              comment,
              amount,
              balanceAfter,
            }) => (
              <ul
                key={id}
                className={
                  type === 'EXPENSE'
                    ? css.operations__listRem
                    : css.operations__listAdd
                }
              >
                <li>
                  <p>Date</p>
                  <p>{transactionDate}</p>
                </li>
                <li>
                  <p>Type</p>
                  <p>{type !== 'EXPENSE' ? '+' : '-'}</p>
                </li>
                <li>
                  <p>Category</p>
                  <p>
                    {categoriesList.length &&
                      categoriesList.find(cat => cat.id === categoryId).name}
                  </p>
                </li>
                <li>
                  <p>Comment</p>
                  {comment ? <CommentHover comment={comment} /> : <p>-</p>}
                </li>
                <li>
                  <p>Sum</p>
                  <p
                    className={
                      type === 'EXPENSE'
                        ? css.operations__balanceAdd
                        : css.operations__balanceRem
                    }
                  >
                    {amount.toFixed(2)}
                  </p>
                </li>
                <li>
                  <p>Balance</p>
                  <p>{balanceAfter.toFixed(2)}</p>
                </li>
                <li>
                  <button
                    className={css.operation__btn}
                    type="button"
                    onClick={() => onDelete(id, amount)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            )
          )
        : null}
    </div>
  );
};
