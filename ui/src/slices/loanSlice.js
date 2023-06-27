import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applied_loan: [],
  isLoading: false,
  error: null,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    createLoan: (state, action) => {
      state.applied_loan = action.payload;
    },
  },
});

export const { createLoan } = loanSlice.actions;

export default loanSlice.reducer;
