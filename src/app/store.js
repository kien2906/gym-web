import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../feature/cartSlice";
import authReducer from "../feature/authSlice";
import { baseApi } from "../services/baseApi";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
