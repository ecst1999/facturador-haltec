import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth/AuthSlice";


export const Store = configureStore({
    reducer: {
        auth: AuthSlice.reducer
    }
});