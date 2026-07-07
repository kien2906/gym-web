import { baseApi } from "../services/baseApi"


export  const reviewApi=  baseApi.injectEndpoints({
   endpoints: (builder)=>({
    getReviews : builder.query({
        query : ()=> "reviews",
    })
   })


})
export const{useGetReviewsQuery}=reviewApi