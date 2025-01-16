import { useDispatch, useSelector } from "react-redux"
import baseApi from "../api/base/baseApi"
import { onLoadMunicipalidades, onLoadNumeracion } from "../store"
import { getToken } from "../helpers"


export const UseFacturaStore = () => {

    const dispatch = useDispatch()
    const { rangos_numeracion, municipalidades } = useSelector(state => state.factura)

    const token = getToken();

    const headers = { 'Authorization': `Bearer ${token}` }; 

    const getNumeracion = async() => {
        const { data } = await baseApi.get('/v1/numbering-ranges', {headers})
        
        dispatch(onLoadNumeracion(data.data))
    }

    const getMunicipales = async() => {
      const { data } = await baseApi.get('/v1/municipalities', {headers})

      dispatch(onLoadMunicipalidades(data.data))      
    }

  return {
    //Properties
    rangos_numeracion,
    municipalidades,

    //Methods
    getNumeracion,
    getMunicipales,
  }
}
