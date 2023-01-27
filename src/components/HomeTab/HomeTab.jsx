import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';
import { deleteTransaction } from 'redux/transactions/transactionsOperations';
import { selectTransactions } from 'redux/transactions/transactionsSelectors';
import { changeBalance } from 'redux/auth/authSlice';
import ButtonAddTransactions from 'components/ButtonAddTransactions/ButtonAddTransactions';

import { OperationList } from 'components/OperationList/OperationList';
import { OperationTable } from 'components/OperationTable/OperationTable';

const HomeTab = () => {
  const transactions = useSelector(selectTransactions);
  const dispatch = useDispatch();

  const onDelete = (id, amount) => {
    dispatch(deleteTransaction(id));
    dispatch(changeBalance(amount));
  };

  return (
    <>
      <Media
        query="(max-width:767px)"
        render={() => (
          <OperationList transactions={transactions} onDelete={onDelete} />
        )}
      />

      <Media
        query="(min-width:768px)"
        render={() => (
          <OperationTable transactions={transactions} onDelete={onDelete} />
        )}
      />
      <ButtonAddTransactions />
    </>
  );
};

export default HomeTab;
