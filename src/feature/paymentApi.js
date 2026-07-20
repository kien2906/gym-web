
 import { baseApi } from "../services/baseApi"

const Payment = baseApi.injectEndpoints({
    endpoints : (builder) =>({
       createPayment : builder.mutation({
         query : (data) =>({
            url : "/payment",
            method :"POST",
            body: data
         }),
         invalidatesTags: ["Cart","Payment"],
       }) 

    })
})

export const {useCreatePaymentMutation} = Payment