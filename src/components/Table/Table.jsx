import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { BsFillTrashFill } from 'react-icons/bs';
import { deleteTransaction } from 'redux/transactions/transactionsOperations';
import { changeBalance } from 'redux/auth/authSlice';
import { useTranslation } from 'react-i18next';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import css from './Table.module.scss';

const theme = createTheme({
  typography: {
    fontFamily: "'Open Sans', sans-serif",
    fontSize: 16,
  },
  palette: {
    primary: {
      main: 'rgba(74, 86, 226, 1)',
    },
  },
});

function formatNumber(value) {
  const formattedValue = value
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
  return formattedValue;
}

export const Table = () => {
  const transactions = useSelector(state => state.transactions.items);
  const categoriesList = useSelector(
    state => state.transactions.transactionCategories.items
  );
  const [page, setPage] = useState(5);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onDelete = params => {
    dispatch(deleteTransaction(params.id));
    dispatch(changeBalance(params.row.sum));
  };

  const columns = [
    {
      field: 'date',
      headerName: t('date'),
      headerClassName: css.gridHeader,
      headerAlign: 'center',
      width: 120,
      align: 'center',
    },
    {
      field: 'type',
      headerName: t('type'),
      headerClassName: css.gridHeader,
      headerAlign: 'center',
      width: 70,
      align: 'center',
      renderCell: params =>
        params.value === '+' ? (
          <AddIcon style={{ color: 'rgb(36, 204, 167)', fontSize: 'large' }} />
        ) : (
          <RemoveIcon
            style={{ color: 'rgb(255, 102, 150)', fontSize: 'large' }}
          />
        ),
    },
    {
      field: 'category',
      headerName: t('category'),
      headerClassName: css.gridHeader,
      headerAlign: 'center',
      width: 160,
      align: 'center',
      sortable: false,
    },
    {
      field: 'comment',
      headerName: t('comment'),
      headerClassName: css.gridHeader,
      headerAlign: 'center',
      align: 'center',
      width: 110,
      sortable: false,
    },
    {
      field: 'sum',
      headerName: t('sum'),
      headerClassName: css.gridHeader,
      headerAlign: 'center',
      width: 110,
      align: 'right',
      cellClassName: params =>
        Number(params.value) < 0 ? css.redCell : css.greenCell,
      valueFormatter: params => formatNumber(params.value),
    },
    {
      field: 'balance',
      headerName: t('balance'),
      headerClassName: css.gridHeader,
      headerAlign: 'center',
      width: 120,
      align: 'right',
      cellClassName: params =>
        Number(params.value) < 0 ? css.redCell : css.greenCell,
      valueFormatter: params => formatNumber(params.value),
    },
    {
      field: 'icons',
      headerName: '',
      headerClassName: css.gridHeader,
      width: 50,
      sortable: false,
      renderCell: params => (
        <button
          type="button"
          onClick={() => onDelete(params)}
          className={css.scrollTableBtn}
        >
          <BsFillTrashFill style={{ fill: '#fff' }} />
        </button>
      ),
    },
  ];

  const rows = transactions.map(
    ({
      id,
      transactionDate,
      type,
      categoryId,
      comment,
      amount,
      balanceAfter,
    }) => {
      return {
        id,
        date: transactionDate,
        type: type !== 'EXPENSE' ? '+' : '-',
        category:
          categoriesList.length &&
          t(
            `${categoriesList
              .find(cat => cat.id === categoryId)
              ?.name?.toLowerCase()}`
          ),
        comment: comment ? comment : '-',
        sum: amount,
        balance: balanceAfter,
        icons: <BsFillTrashFill style={{ fill: '#fff' }} />,
      };
    }
  );

  const handleRowsPerPageChange = event => {
    setPage(event);
  };
  const translations = {
    rowsPerPage: 'Рядов на странице',
    page: 'Страница',
    of: 'из',
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: 630,
          width: '100%',
          backgroundColor: '#fff',
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={page}
          rowsPerPageOptions={[5, 10, 15]}
          onPageSizeChange={handleRowsPerPageChange}
          experimentalFeatures={{ newEditingApi: true }}
          disableColumnMenu
          disableSelectionOnClick={true}
          localeText={translations}
          style={{ backgroundColor: '#fff' }}
        />
      </Box>
    </ThemeProvider>
  );
};
