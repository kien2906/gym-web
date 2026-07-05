import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isLogin: false,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default auth.reducer;
