import { createSlice } from "@reduxjs/toolkit"
import { TokenResponse } from "../../models"

export const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false,
        isLoading: false,
        token_type: "",
        expires_in: 0,
        access_token: "",
        refresh_token: "",
        message: "",
    },
    reducers: {
        login: (state, { payload = [] }) => {
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
                state.isLogged = true
            }
                        
            

        }
    }
});

export const {
    login
} = AuthSlice.actions