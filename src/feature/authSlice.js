import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../api/authApi";

const initialState = {
  user: null,
  token: null,
  isLogin: false,
  loading: false,
  error: null,
  message: null,
};

export const loginUser = createAsyncThunk("auth/login", async (form) => {
  const res = await authApi.login(form);
  return res.data;
});

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
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
      })
      .addCase(loginUser.rejected, (state) => {
        state.loading = false;
        state.error = true;
        state.isLogin = false;
        state.message = null;
      });
  },
});

export default auth.reducer;
