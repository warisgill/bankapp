import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  new_account: [],
  isLoading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "new_account",
  initialState,
  reducers: {
    createAccount: (state, action) => {
      state.atms = action.payload;
    },
  },
});

export const { createAccount } = accountSlice.actions;

export default accountSlice.reducer;
