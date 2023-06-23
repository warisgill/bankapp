import { apiSlice } from "./usersApiSlice";
const transactionUrl = import.meta.env.VITE_TRANSACTION_URL;

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.mutation({
      query: (data) => ({ 
        url: transactionUrl, 
        method: "POST", 
        body: data 
      }),
    }),
  }),
});

export const { useGetTransactionsMutation } = transactionApiSlice;
