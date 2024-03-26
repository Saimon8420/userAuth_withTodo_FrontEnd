import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://userauth-withtodo-backend.onrender.com/",
        prepareHeaders(headers) {
            return headers;
        },
        credentials: "include"
    }),
    tagTypes: ["Users", "Todos"],
    endpoints: (builder) => ({
    }),
})