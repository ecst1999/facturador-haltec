import { createSlice } from "@reduxjs/toolkit";



export const FacturaSlice = createSlice({
    name: 'factura',
    initialState: {
        rangos_numeracion: [],
        isLoading: false
    },
    reducers: {
        onLoadNumeracion: (state, {payload = []}) => {
            state.isLoading = true 

            
            payload.forEach(r => {
                const exists = state.rangos_numeracion.some( doc => doc.id === r.id );
                if(!exists){
                    state.rangos_numeracion.push(r)
                }
            })
            
        }
    }
})


export const {
    onLoadNumeracion
} = FacturaSlice.actions