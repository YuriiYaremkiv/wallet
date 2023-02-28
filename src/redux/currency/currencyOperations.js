import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getCurrencyRate = createAsyncThunk(
  'currency/getCurrencyRate',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios('https://api.monobank.ua/bank/currency');
      const currencyRate = [response.data[0], response.data[1]];

      localStorage.setItem('currency', JSON.stringify(currencyRate));

      return currencyRate;
    } catch (err) {
      const currencyRate = JSON.parse(localStorage.getItem('currency'));
      if (!currencyRate) {
        return [];
      }
      return currencyRate;
    }
  }
);
