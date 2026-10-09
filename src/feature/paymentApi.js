
 import { baseApi } from "../services/baseApi"

const Payment = baseApi.injectEndpoints({
    endpoints : (builder) =>({
          getAllPayments : builder.query({
             query : () => "/payment",
             providesTags: ["Payment"],
          }),
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

export const {useGetAllPaymentsQuery, useCreatePaymentMutation} = Payment