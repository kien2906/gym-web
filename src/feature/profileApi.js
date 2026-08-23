import { baseApi } from "../services/baseApi";

export const profile = baseApi.injectEndpoints({
  endpoints: (builer) => ({
    updateProfile: builer.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),
    getProfile: builer.query({
      query: (id) => `/users/profile/${id}`,
      providesTags: ["Profile"],
    }),
  }),
});

export const { useUpdateProfileMutation, useGetProfileQuery } = profile;
