import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  new_account: [],
  all_accounts: [],
  selected_account: [],
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
    },
    selectedAccount: (state, action) => {
      state.selected_account = action.payload;
    },
    deleteSelectedAccount: (state, action) => {
      state.selected_account = [];
    }
  },
});

export const { createAccount, getAccounts, selectedAccount, deleteSelectedAccount } = accountSlice.actions;

export default accountSlice.reducer;
