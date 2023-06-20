import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/usersApiSlice";
import authReducer from "./slices/authSlice";
import atmReducer from "./slices/atmSlice";
import accountReducer from "./slices/accountSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    atm: atmReducer,
    auth: authReducer,
    new_account: accountReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
  devTools: true,
});

export default store;
