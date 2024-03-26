import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (data) => ({
                url: "user/register",
                method: "POST",
                body: data,
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "user/login",
                method: "POST",
                body: data,
            }),
        }),
        update: builder.mutation({
            query: (data) => ({
                url: "user/updateUser",
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Users"],
        }),
        // this will come via accessToken,
        getUserInfo: builder.query({
            query: () => ({
                url: "user/getUser",
            }),
        }),
        // Send reset email to user
        sendResetEmail: builder.mutation({
            query: (data) => ({
                url: "user/resetPass",
                method: "POST",
                body: data,
            })
        }),
        // reset password
        resetPassword: builder.mutation({
            query: (data) => ({
                url: "user/reset/resetPass",
                method: "PUT",
                body: data,
            })
        }),
        // logoutUser
        logoutUser: builder.query({
            query: () => ({
                url: "user/logout",
            }),
        }),
    })
})

export const { useLoginMutation, useRegisterMutation, useUpdateMutation, useGetUserInfoQuery, useSendResetEmailMutation, useResetPasswordMutation, useLazyLogoutUserQuery } = authApi;