import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "./auth/AuthSlice";
import { FacturaSlice } from "./factura/FacturaSlice";


export const Store = configureStore({
    reducer: {
        auth: AuthSlice.reducer,
        factura: FacturaSlice.reducer,
    }
});