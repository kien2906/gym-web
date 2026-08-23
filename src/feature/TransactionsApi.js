import { baseApi } from "../services/baseApi";

const Order= baseApi.injectEndpoints({
    endpoints : (builder) =>({
        getOrder : builder.query({
            query : () => "/orders",
            providesTags:["Tracstion"]
        })
    })
})

export const {useGetOrderQuery} =Order