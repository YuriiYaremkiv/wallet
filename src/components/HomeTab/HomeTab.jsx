import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Media from 'react-media';
import { deleteTransaction } from 'redux/transactions/transactionsOperations';
import { changeBalance } from 'redux/auth/authSlice';
import { OperationList } from 'components/OperationList/OperationList';
import { OperationTable } from 'components/OperationTable/OperationTable';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Table } from 'components/Table/Table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import modeConfig from 'configs/mode.config';

const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 14,
  },
  palette: {
    primary: {
      main: 'rgba(74, 86, 226, 1)',
    },
  },
});

export const HomeTab = () => {
  const [alignment, setAlignment] = useState('small');
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transactions.items);
  const { themeMode } = useSelector(state => state.themeMode);
  const styles = modeConfig.style[themeMode];

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

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
          <ThemeProvider theme={theme}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'left',
                height: '24px',
                marginBottom: '6px',
              }}
            >
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton value="small">Short</ToggleButton>
                <ToggleButton value="big">Detaling</ToggleButton>
              </ToggleButtonGroup>
            </div>
            {alignment === 'small' ? (
              <OperationTable transactions={transactions} onDelete={onDelete} />
            ) : (
              <Table />
            )}
          </ThemeProvider>
        )}
      />
    </>
  );
};
