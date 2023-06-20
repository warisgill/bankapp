import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { apiSlice } from './usersApiSlice'; 
const ATM_URL = 'http://localhost:8001/api/atm';


export const atmApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAtms: builder.mutation({
      query: () => ATM_URL,
      method: 'GET',
    }),
  }),
});

export const {
  useGetAtmsMutation,
} = atmApiSlice;
