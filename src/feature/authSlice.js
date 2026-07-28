import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { baseApi } from "../services/baseApi";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isLogin: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  message: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutaccount(state) {
      state.user = null;
      state.token = null;
      state.isLogin = false;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(loginUser.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //       state.message = null;
  //     })
  //     .addCase(loginUser.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.user = action.payload.user;
  //       state.token = action.payload.token;
  //       state.error = null;
  //       state.message = action.payload.message;
  //       state.isLogin = true;
  //     })
  //     .addCase(loginUser.rejected, (state) => {
  //       state.loading = false;
  //       state.error = true;
  //       state.isLogin = false;
  //       state.message = null;
  //     });
  // },
});
export const { logoutaccount } = auth.actions;
export default auth.reducer;

export const login = baseApi.injectEndpoints({
  endpoints: (builer) => ({
    login: builer.mutation({
      query: (data) => ({ url: "/users/login", method: "POST", body: data }),
    }),
  }),
});

export const { useLoginMutation } = login;
