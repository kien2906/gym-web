import { baseApi } from "../services/baseApi";

export const Class = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClass: builder.query({
      query: () => "/classes",
    }),

    getClassId: builder.query({
      query: (id) => `/classes/${id}`,
    }),
  }),
});

export const { useGetClassQuery, useGetClassIdQuery} = Class;
