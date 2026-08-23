
import { createSlice } from "@reduxjs/toolkit";
import { baseApi } from "../services/baseApi";


// export const profile = baseApi.injectEndpoints({
//   endpoints: (builer) => ({
//     updateProfile: builer.mutation({
//       query: (data) => ({
//         url: "/users/profile",
//         method: "PATCH",
//         body: data,
//       }),
//     }),
//   }),
// });

//export const { useUpdateProfileMutation } = profile;

// const initialState = {
//   cartItem: [],
// };
// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addtoCart(state, action) {
//       // return object
//       const findCart = state.cartItem.find((p) => p.id === action.payload.id);

//       if (findCart) {
//         findCart.quantity += 1;
//       } else {
//         state.cartItem.push({
//           ...action.payload,
//           quantity: 1,
//         });
//       }
//     },
//     removeCart(state, action) {
//       state.cartItem = state.cartItem.filter(
//         (item) => item.id !== action.payload,
//       );
//     },
//     increaseCart(state, action) {
//       state.cartItem = state.cartItem.map((t) =>
//         t.id === action.payload ? { ...t, quantity: t.quantity + 1 } : t,
//       );
//     },
//     decreaseCart(state, action) {
//       state.cartItem = state.cartItem.map((t) =>
//         t.id === action.payload ? { ...t, quantity: t.quantity - 1 } : t,
//       );
//     },

//     clearAllCart() {
//       return initialState;
//     },
//   },
// });
// export const {
//   addtoCart,
//   removeCart,
//   increaseCart,
//   decreaseCart,
//   clearAllCart,
// } = cartSlice.actions;

const addtoCartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCarts: builder.mutation({
      query: (data) => ({
        url: "/cart",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart","Payment"],
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddCartsMutation,
  useGetCartQuery,
  useDeleteCartMutation,
  useClearCartMutation,
} = addtoCartApi;


