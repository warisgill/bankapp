import { apiSlice } from "./usersApiSlice";
const transferUrl = import.meta.env.VITE_TRANSFER_URL;
console.log(transferUrl);

export const transferApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postTransfer: builder.mutation({
      query: (data) => ({ 
        url: transferUrl, 
        method: "POST", 
        body: data 
      }),
    }),
  }),
});

export const { usePostTransferMutation } = transferApiSlice;
