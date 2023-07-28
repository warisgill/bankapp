/**
 * Copyright (c) 2023 Cisco Systems, Inc. and its affiliates All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { apiSlice } from "./usersApiSlice";
const accsUrl = import.meta.env.VITE_ACCOUNTS_URL;
const createAccUrl = import.meta.env.VITE_NEW_ACCOUNT_URL;

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (data) => ({
        url: createAccUrl,
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
        url: accsUrl,
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
