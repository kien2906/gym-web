import { baseApi } from "../services/baseApi";

const Users = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
        providesTags:["User"]
    }),
  }),
});

export const { useGetUsersQuery } = Users;
