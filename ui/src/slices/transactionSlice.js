import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
  isLoading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    storeTransaction: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { storeTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
