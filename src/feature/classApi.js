import { data } from "react-router-dom";
import { baseApi } from "../services/baseApi";

export const Class = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClass: builder.query({
      query: () => "/classes",
      providesTags: ["Classes"],
    }),

    getClassId: builder.query({
      query: (id) => `/classes/${id}`,
    }),

    createClass: builder.mutation({
      query: (data) => ({
        url: `/classes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Classes"],
    }),

    deleteClass: builder.mutation({
      query: (id) => ({
        url: `/classes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Classes"],
    }),
    editClass: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/classes/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Classes"],
    }),
  }),
});

export const {
  useGetClassQuery,
  useGetClassIdQuery,
  useCreateClassMutation,
  useDeleteClassMutation,
  useEditClassMutation,
} = Class;
