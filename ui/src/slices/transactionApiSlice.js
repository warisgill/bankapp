/**
 * Copyright (c) 2023 Cisco Systems, Inc. and its affiliates All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

import { apiSlice } from "./usersApiSlice";
import ApiUrls from "./apiUrls";

const transactionUrl = import.meta.env.VITE_TRANSACTION_URL || ApiUrls.VITE_TRANSACTION_URL;

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
