import { baseApi } from "../services/baseApi";

const register = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostRegisterMutation } = register;
