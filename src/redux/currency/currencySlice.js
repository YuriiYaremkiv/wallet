import { createSlice } from '@reduxjs/toolkit';
import { getCurrencyRate } from './currencyOperations';

export const transactionsCurrencySlice = createSlice({
  name: 'currentRate',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder.addCase(getCurrencyRate.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCurrencyRate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(getCurrencyRate.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload.length === 0) {
        state.error = 'error';
        return;
      }
      state.items = action.payload;
    });
  },
});
