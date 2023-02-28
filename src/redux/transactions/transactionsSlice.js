import { createSlice } from '@reduxjs/toolkit';
import {
  addTransaction,
  fetchTransactions,
  deleteTransaction,
  fetchTransactionCategories,
  fetchTransactionsSummary,
  fetchTransactionsSummaryOfPeriod,
} from './transactionsOperations';

const initialState = {
  items: [],
  summaryItems: {
    categoriesSummary: [],
    incomeSummary: 0,
    expenseSummary: 0,
    periodTotal: 0,
    year: 0,
    month: 0,
  },
  isLoading: false,
  error: null,
  transactionCategories: {
    items: [],
  },
};

const transactionsSlice = createSlice({
  name: 'userTransactions',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchTransactions.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, { payload }) => {
      state.items = payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchTransactions.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
    builder.addCase(addTransaction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addTransaction.fulfilled, (state, { payload }) => {
      state.items = [...state.items, payload];
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(addTransaction.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
    builder.addCase(deleteTransaction.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteTransaction.fulfilled, (state, { payload }) => {
      state.items = state.items.filter(({ id }) => id !== payload);
      state.isLoading = false;
    });
    builder.addCase(deleteTransaction.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
    builder.addCase(fetchTransactionCategories.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(
      fetchTransactionCategories.fulfilled,
      (state, { payload }) => {
        state.transactionCategories.items = payload;
        state.isLoading = false;
        state.error = null;
      }
    );
    builder.addCase(
      fetchTransactionCategories.rejected,
      (state, { payload }) => {
        state.error = payload;
        state.isLoading = false;
      }
    );
    builder.addCase(fetchTransactionsSummary.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchTransactionsSummary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.summaryItems = action.payload;
    });
    builder.addCase(fetchTransactionsSummary.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchTransactionsSummaryOfPeriod.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchTransactionsSummaryOfPeriod.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.summaryItems = action.payload;
      }
    );
    builder.addCase(
      fetchTransactionsSummaryOfPeriod.rejected,
      (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      }
    );
  },
});

export default transactionsSlice.reducer;
