import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://userauth-withtodo-backend.onrender.com/",
        prepareHeaders: async (headers, { getState, endpoint }) => {
            const token = JSON.parse(localStorage.getItem("userAuth"));
            if (token) {
                headers.set("authorization", `Bearer ${token?.accessToken}`)
            }
            return headers;
        }
    }),
    tagTypes: ["Users", "Todos"],
    endpoints: (builder) => ({
    }),
})