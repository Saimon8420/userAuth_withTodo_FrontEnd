import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: undefined,
    user: undefined,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.accessToken = undefined;
            state.user = undefined;
            localStorage.removeItem("userAuth");
        },
        updateUser: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = undefined;
        },
        // set user via accessToken
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
    }
});

export const { userLoggedIn, userLoggedOut, updateUser, setUser } = authSlice.actions;
export default authSlice.reducer;