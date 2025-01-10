import { createSlice } from "@reduxjs/toolkit"

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'loading', // 'authenticated','not-authenticated', 'loading',
        isLoading: false,
        token_type: "",
        expires_in: 0,
        access_token: "",
        refresh_token: "",
        message: "",
    },
    reducers: {
        onLogin: (state, { payload = [] }) => {
            state.isLoading = true

            if(payload == null){
                state.message = "Error al iniciar sesión"
                state.isLoading = false
            }else{
                state.token_type = payload.token_type
                state.expires_in = payload.expires_in
                state.isLoading = false
                state.access_token = payload.access_token
                state.refresh_token = payload.refresh_token
                state.status = "authenticated"
            }                        

        },
        onLogOut: (state, { payload }) => {
            state.isLoading = false            
            state.token_type = ""
            state.expires_in = 0
            state.access_token = ""
            state.refresh_token = ""            
            state.status = "not-authenticated"
            state.message = payload
        }
    }
});

export const {
    onLogin,
    onLogOut
} = AuthSlice.actions