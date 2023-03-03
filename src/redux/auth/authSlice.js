import { createSlice } from '@reduxjs/toolkit';
import { register, logIn, logOut, refreshUser } from './authOperations';

const state = {
  user: { name: null, email: null, password: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
  isLoading: false,
};

export const auth = createSlice({
  name: 'auth',
  initialState: state,
  extraReducers: builder => {
    builder.addCase(register.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
    builder.addCase(logIn.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });

    builder.addCase(logOut.fulfilled, state => {
      state.user = { name: null, email: null, password: null };
      state.isLoggedIn = false;
      state.token = null;
    });
    builder.addCase(refreshUser.pending, state => {
      state.isRefreshing = true;
      state.isLoading = true;
    });
    builder.addCase(refreshUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(refreshUser.rejected, state => {
      state.isRefreshing = false;
      state.error = null;
      state.isLoading = false;
    });
  },
  reducers: {
    changeBalance(state, action) {
      state.user.balance = state.user.balance - action.payload;
    },
  },
});

export const { changeBalance } = auth.actions;
