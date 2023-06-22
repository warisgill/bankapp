import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  new_account: [],
  all_accounts: [],
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    createAccount: (state, action) => {
      state.new_account = action.payload;
    },
    getAccounts: (state, action) => {
      state.all_accounts = action.payload;
    }
  },
});

export const { createAccount, getAccounts } = accountSlice.actions;

export default accountSlice.reducer;
