import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../feature/apiSlice";
import authReducer from "../feature/authSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
