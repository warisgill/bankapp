/**
 * Copyright (c) 2023 Cisco Systems, Inc. and its affiliates All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { apiSlice } from "./usersApiSlice";
const loanUrl = import.meta.env.VITE_LOAN_URL;
const loanHistoryUrl = import.meta.env.VITE_LOAN_HISTORY_URL;

export const loanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postLoan: builder.mutation({
      query: (data) => ({ 
        url: `${loanUrl}`, 
        method: "POST", 
        body: data,
        prepareHeaders: (headers) => {
          headers.set("Content-Type", "multipart/form-data");
          return headers;
        },
      }),
    }),
    getApprovedLoans: builder.mutation({
      query: (data) => ({
        url: `${loanHistoryUrl}`,
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

export const { usePostLoanMutation, useGetApprovedLoansMutation } = loanApiSlice;
