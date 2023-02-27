import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// запит на всі транзакції для таблиці
export const getCurrencyRate = createAsyncThunk(
  'currency/getCurrencyRate',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios('https://api.monobank.ua/bank/currency');
      const currency = [response.data[0], response.data[1]];
      return currency;
    } catch (error) {
      console.log('response', error);

      return rejectWithValue(error.message);
    }
  }
);

// currency exchange rate
