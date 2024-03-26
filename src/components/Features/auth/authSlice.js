import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.user = undefined;
        },
        updateUser: (state, action) => {
            state.user = action.payload.user;
        },
        // set user via accessToken
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
    }
});

export const { userLoggedIn, userLoggedOut, updateUser, setUser } = authSlice.actions;
export default authSlice.reducer;