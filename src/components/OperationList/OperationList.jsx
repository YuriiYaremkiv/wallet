import { useSelector } from 'react-redux';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';

import css from './OperationList.module.scss';

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
              <ul key={id} className={css.operations__list}>
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
                  <p>{comment || '-'}</p>
                </li>
                <li>
                  <p>Sum</p>
                  <p>{amount}</p>
                </li>
                <li>
                  <p>Balance</p>
                  <p className={css.operations__balance}>{balanceAfter}</p>
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

//     <table
//       className={
//         operation.amount > 0 ? css.tablePositive : css.tableNegative
//       }
//       key={operation.id}
//     >
//       <tbody>
//         <tr>
//           <td>Date</td>
//           <td>
//             {new Date(operation.transactionDate)
//               .toLocaleDateString()
//               .split('.')
//               .join('-')}
//           </td>
//         </tr>
//         <tr>
//           <td>Type</td>
//           <td>{operation.type !== 'EXPENSE' ? '+' : '-'}</td>
//         </tr>

//         <tr>
//           <td>Category</td>
//           <td>
//             {categoriesList.length &&
//               categoriesList.find(
//                 cat => cat.id === operation.categoryId
//               ).name}
//           </td>
//         </tr>
//         <tr>
//           <td>Comment</td>
//           <td>{operation.comment || '-'}</td>
//         </tr>
//         <tr>
//           <td>Sum</td>
//           <td>{operation.amount}</td>
//         </tr>
//         <tr>
//           <td>Balance</td>
//           <td>{operation.balanceAfter}</td>
//         </tr>
//         <tr>
//           <td colspan="2">
//             <button
//               type="button"
//               className={css.scrollTableBtnMob}
//               onClick={() => onDelete(operation.id, operation.amount)}
//             >
//               Delete
//             </button>
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   ))
// ) : (
//   <p className={css.noTransactionMob}>No transactions</p>
