import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    atms: [],
    isLoading: false,
    error: null,
};

const atmSlice = createSlice({
  name: 'atm',
  initialState,
  reducers: {
    setAtms: (state, action) => {
      state.atms = action.payload;
    },
  },
});

export const { setAtms } = atmSlice.actions;

export default atmSlice.reducer;
