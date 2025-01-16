import { createSlice } from "@reduxjs/toolkit";



export const FacturaSlice = createSlice({
    name: 'factura',
    initialState: {
        rangos_numeracion: [],
        isLoading: false,
        municipalidades: [],
    },
    reducers: {
        onLoadNumeracion: (state, {payload = []}) => {
            state.isLoading = true 

            
            payload.forEach(r => {
                const exists = state.rangos_numeracion.some( doc => doc.id === r.id )
                if(!exists){
                    state.rangos_numeracion.push(r)
                }
            })

            state.isLoading = false
            
        },
        onLoadMunicipalidades: (state, {payload = []}) => {
            state.isLoading = true

            payload.forEach(r => {
                const exists = state.municipalidades.some(mun => mun.id === r.id)
                if(!exists){
                    state.municipalidades.push(r)
                }
            })

            state.isLoading = false
        }
    }
})


export const {
    onLoadNumeracion,
    onLoadMunicipalidades
} = FacturaSlice.actions