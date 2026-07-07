import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

const initialState = {
  user: null,
  token: null,
  isLogin: false,
  loading: false,
  error: null,
  message: null,
  logout: false,
};

export const loginUser = createAsyncThunk("auth/login", async (form) => {
  const res = await authApi.login(form);
  return res.data;
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutaccount(state) {
      state.user = null;
      state.token = null;
      state.isLogin = false;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.result.user;
        state.token = action.payload.result.token;
        state.error = null;
        state.message = action.payload.message;
        state.isLogin = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isLogin = false;
        state.message = null;
      });
  },
});
export const {logoutaccount } =  auth.actions;
export default auth.reducer;
