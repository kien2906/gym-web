import { data } from "react-router-dom"
import { baseApi } from "../services/baseApi"


export  const reviewApi=  baseApi.injectEndpoints({
   endpoints: (builder)=>({
    getReviews : builder.query({
        query : (id)=> `/review/${id}`,
        providesTags: ["Review"]
    }),
    createReviews: builder.mutation({
        query : ({ classId, ...data }) =>({
            url :`/review/${classId}`,
            method :"POST",
            body: data
        }),
        invalidatesTags : ["Review"]
    })
   })


})
export const{useGetReviewsQuery,useCreateReviewsMutation}=reviewApi