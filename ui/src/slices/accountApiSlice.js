import { apiSlice } from "./usersApiSlice";
const accUrl = import.meta.env.VITE_ACCOUNT_URL;

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${accUrl}/account/create`,
        method: "POST",
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "multipart/form-data");
          return headers;
        },
        body: data,
      }),
    }),
    getAllAccounts: builder.mutation({
      query: (data) => ({
        url: `${accUrl}/account/allaccounts`,
        method: "POST",
        body: data,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "application/json");
          return headers;
        },
      }),
    }),
  }),
});

export const { useCreateAccountMutation, useGetAllAccountsMutation } = accountApiSlice;
