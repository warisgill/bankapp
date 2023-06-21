import { apiSlice } from "./usersApiSlice";
const ACCOUNT_URL = "http://127.0.0.1:5000";

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: `${ACCOUNT_URL}/account/create`,
        method: "POST",
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "multipart/form-data");
          return headers;
        },
        body: data,
      }),
    }),
  }),
});

export const { useCreateAccountMutation } = accountApiSlice;
