import { baseApi } from "../services/baseApi";

export const profile = baseApi.injectEndpoints({
  endpoints: (builer) => ({
    updateProfile: builer.mutation({
      query: (data) => ({
        url: "/users/profile",
        method: "PATCH",
        body: data,
        })
    }),
  }),
});

export const { useUpdateProfileMutation } = profile;
