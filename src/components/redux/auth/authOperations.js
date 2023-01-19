import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://wallet.goit.ua/";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const register = createAsyncThunk("auth/register", async (user) => {
  try {
    const response = await axios.post("/api/auth/sign-up", user);
    token.set(response.data.token);
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
});

const login = createAsyncThunk("auth/login", async (user) => {
  try {
    const response = await axios.post("/api/auth/sign-in", user);
    token.set(response.data.token);
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
});

const signOut = createAsyncThunk("auth/signOut", async (user) => {
  try {
    const response = await axios.delete("/api/auth/sign-out");
    token.unset();
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
});

const refresh = createAsyncThunk("auth/refresh", async (user) => {
  try {
    const response = await axios.delete("/api/auth/sign-out");
    token.unset();
    return response.data;
  } catch (e) {
    throw new Error(e.message);
  }
});

const operations = { register, login, signOut };
export default operations;
