import { createSlice } from '@reduxjs/toolkit';
import { getCurrencyRate } from './currencyOperations';

export const transactionsCurrencySlice = createSlice({
  name: 'currentRate',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: {
    [getCurrencyRate.pending]: state => {
      state.isLoading = true;
      state.error = null;
    },
    [getCurrencyRate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    },
    [getCurrencyRate.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
