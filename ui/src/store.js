import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/usersApiSlice";
import authReducer from "./slices/authSlice";
import atmReducer from "./slices/atmSlice";
import accountReducer from "./slices/accountSlice";
import transferReducer from "./slices/transferSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    atm: atmReducer,
    auth: authReducer,
    account: accountReducer,
    transfer: transferReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([apiSlice.middleware]),
  devTools: true,
});

export default store;
