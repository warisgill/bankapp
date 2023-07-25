import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      // Cookies.remove('jwt');
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
