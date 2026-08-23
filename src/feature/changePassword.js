import { baseApi } from "../services/baseApi";

export const ApiChangePassword = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/users/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useChangePasswordMutation } = ApiChangePassword;
