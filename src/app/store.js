import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSliceReducer from "../components/Features/auth/authSlice";
import { apiSlice } from "../components/Features/api/apiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})