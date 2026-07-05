import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart(state, action) {
      // return object
      const findCart = state.cartItem.find((p) => p.id === action.payload.id);

      if (findCart) {
        findCart.quantity += 1;
      } else {
        state.cartItem.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeCart(state, action) {
      state.cartItem = state.cartItem.filter(
        (item) => item.id !== action.payload,
      );
    },
    increaseCart(state, action) {
      state.cartItem = state.cartItem.map((t) =>
        t.id === action.payload ? { ...t, quantity: t.quantity + 1 } : t,
      );
    },
    decreaseCart(state, action) {
      state.cartItem = state.cartItem.map((t) =>
        t.id === action.payload ? { ...t, quantity: t.quantity - 1 } : t,
      );
    },

    clearAllCart() {
      return initialState;
    },
  },
});
export const {
  addtoCart,
  removeCart,
  increaseCart,
  decreaseCart,
  clearAllCart,
} = cartSlice.actions;
export const selectCartItems = (state) => state.cart.cartItem;
export const selectCartTotal = (state) =>
  state.cart.cartItem.reduce(
    (sum, item) => sum + item.price * (item.quantity || 0),
    0,
  );
export default cartSlice.reducer;
