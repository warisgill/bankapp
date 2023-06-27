import { apiSlice } from "./usersApiSlice";
const loanUrl = import.meta.env.VITE_LOAN_URL;

export const loanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postLoan: builder.mutation({
      query: (data) => ({ 
        url: loanUrl, 
        method: "POST", 
        body: data,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "multipart/form-data");
          headers.set("Access-Control-Allow-Origin", "*");
          return headers;
        },
      }),
    }),
  }),
});

export const { usePostLoanMutation } = loanApiSlice;
