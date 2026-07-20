import { data } from "react-router-dom"
import { baseApi } from "../services/baseApi"


export  const reviewApi=  baseApi.injectEndpoints({
   endpoints: (builder)=>({
    getReviews : builder.query({
        query : (id)=> `/review/${id}`,
    }),
    createReviews: builder.mutation({
        query : ({ id, data }) =>({
            url :`/reviews/${id}`,
            method :"POST",
            body: data
        })
    })
   })


})
export const{useGetReviewsQuery,useCreateReviewsMutation}=reviewApi