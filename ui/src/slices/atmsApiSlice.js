import { apiSlice } from "./usersApiSlice";
const atmUrl = import.meta.env.VITE_ATM_URL;

export const atmApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAtms: builder.mutation({
      query: () => atmUrl,
      method: "GET",
    }),
  }),
});

export const { useGetAtmsMutation } = atmApiSlice;
