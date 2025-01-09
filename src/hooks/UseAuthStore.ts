import { useDispatch } from "react-redux"
import { login } from "../store"
import baseApi from "../api/base/baseApi"
import { getEnviroment } from "../helpers/getEnviroment"
import { TokenErrorResponse } from "../models"

const {VITE_CLIENT_ID_API, VITE_CLIENT_SECRET_API} = getEnviroment()

export const UseAuthStore = () => {

    const dispatch = useDispatch();

    const loginFetch = async (username: string, password: string) => {
        
        
        const { data, status } = await baseApi.post('/oauth/token' , {
            grant_type: 'password',
            client_id: VITE_CLIENT_ID_API,
            client_secret: VITE_CLIENT_SECRET_API,
            username,
            password
        }).catch( (err: TokenErrorResponse) => {
            console.log(err.response.data.error_description) 
        })        

        if(status == 200)
            dispatch(login(data))
        else
            dispatch(login(null))
        
    }

    return {
        //Properties

        //Methods
        loginFetch,
    }
}