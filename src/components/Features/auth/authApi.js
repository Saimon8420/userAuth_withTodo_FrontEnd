import { apiSlice } from "../api/apiSlice";
import { setUser, updateUser, userLoggedIn, userLoggedOut } from "./authSlice";

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
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem("userAuth", JSON.stringify({
                        accessToken: result?.data?.accessToken
                    }));
                    dispatch(userLoggedIn({
                        accessToken: result?.data?.accessToken,
                        user: result?.data?.userData,
                    }))
                } catch (error) {
                    //
                }
            }
        }),
        update: builder.mutation({
            query: (data) => ({
                url: "user/updateUser",
                method: "PUT",
                body: data,
            }),
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                const result = await queryFulfilled;
                dispatch(updateUser({
                    user: result?.data?.userData,
                }))
            },
            // invalidatesTags: ["Users"]
        }),
        // this will come via accessToken,
        getUserInfo: builder.query({
            query: () => "user/getUser",
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    if (result?.data?.data) {
                        dispatch(setUser({
                            user: result?.data?.data,
                        }));
                    }
                    if (result?.data?.data?.msg) {
                        dispatch(userLoggedOut());
                    }
                } catch (error) {
                    // Handle the error here, e.g., log it or show a message to the user
                    console.error("An error occurred:", error);
                }
            }
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
    })
})

export const { useLoginMutation, useRegisterMutation, useUpdateMutation, useGetUserInfoQuery, useSendResetEmailMutation, useResetPasswordMutation } = authApi;