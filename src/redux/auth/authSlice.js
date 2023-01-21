import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./authOperations";

const initialState = {
  user: {
    username: null,
    email: null,
    id: null,
    balance: null,
  },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [authOperations.register.pending](state) {},
    [authOperations.register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.register.rejected](state) {},
    [authOperations.login.pending](state) {},
    [authOperations.login.fulfilled](state, action) {
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [authOperations.login.rejected](state) {},
    [authOperations.signOut.pending](state) {},
    [authOperations.signOut.fulfilled](state, action) {
      state.token = null;
      state.isLoggedIn = false;
    },
    [authOperations.signOut.rejected](state) {},
    [authOperations.refresh.pending](state) {},
    [authOperations.refresh.fulfilled](state, action) {
      state.isLoggedIn = true;
    },
    [authOperations.refresh.rejected](state) {},
  },
});

export default authSlice.reducer;
