import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSliceReducer from "../components/Features/auth/authSlice";
import { apiSlice } from "../components/Features/api/apiSlice";
import todoSliceReducer from "../components/Features/todo/todoSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceReducer,
        todo: todoSliceReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})