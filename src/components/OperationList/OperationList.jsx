import { useSelector } from 'react-redux';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';
import { CommentHover } from 'block/CommentHover/CommentHover';
import { useTranslation } from 'react-i18next';
import css from './OperationList.module.scss';

export const OperationList = ({ transactions, onDelete }) => {
  const categories = useSelector(selectTransactionCategories);
  const categoriesList = categories.map(data => data);
  const operations = [...transactions];
  const { t } = useTranslation();

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
                  <p>{t('date')}</p>
                  <p>{transactionDate}</p>
                </li>
                <li>
                  <p>{t('type')}</p>
                  <p>{type !== 'EXPENSE' ? '+' : '-'}</p>
                </li>
                <li>
                  <p>{t('category')}</p>
                  <p>
                    {categoriesList.length &&
                      categoriesList.find(cat => cat.id === categoryId).name}
                  </p>
                </li>
                <li>
                  <p>{t('comment')}</p>
                  {comment ? <CommentHover comment={comment} /> : <p>-</p>}
                </li>
                <li>
                  <p>{t('sum')}</p>
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
                  <p>{t('balance')}</p>
                  <p>{balanceAfter.toFixed(2)}</p>
                </li>
                <li>
                  <button
                    className={css.operation__btn}
                    type="button"
                    onClick={() => onDelete(id, amount)}
                  >
                    {t('delete')}
                  </button>
                </li>
              </ul>
            )
          )
        : null}
    </div>
  );
};
