import { createSlice } from "@reduxjs/toolkit";


export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: false,
        isLoading: false,
        token_type: "",
        expires_in: 0,
        access_token: "",
        refresh_token: ""
    },
    reducers: {
        login: (state, { payload = [] }) => {
            state.isLoading = true;
        }
    }
});

export const {
    login
} = AuthSlice.actions;