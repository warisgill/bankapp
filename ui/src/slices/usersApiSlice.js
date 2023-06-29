import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
const usersUrl = import.meta.env.VITE_USERS_URL;
console.log("usersUrl: ", usersUrl)

// const baseQuery = fetchBaseQuery({ baseUrl: 'http://host.docker.internal:8000/' });
const baseQuery = fetchBaseQuery({ 
  baseUrl: "",
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: () => ({}),
});

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${usersUrl}/auth`,
        method: "POST",
        body: data,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: (jwtCookie) => ({
        url: `${usersUrl}/logout`,
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': jwtCookie,
        },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${usersUrl}`,
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${usersUrl}/profile`,
        method: "PUT",
        body: {
          _id: data._id,
          name: data.name,
          email: data.email,
          password: data.password,
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateUserMutation,
} = userApiSlice;
