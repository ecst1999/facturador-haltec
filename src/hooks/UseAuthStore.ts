import { useDispatch, useSelector } from "react-redux"
import { onLogin, onLogOut } from "../store"
import baseApi from "../api/base/baseApi"
import { getEnviroment } from "../helpers/getEnviroment"
import { TokenErrorResponse } from "../models"

const {VITE_CLIENT_ID_API, VITE_CLIENT_SECRET_API} = getEnviroment()

export const UseAuthStore = () => {

    const dispatch = useDispatch();
    const { status } = useSelector( state => state.auth)

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

        if(status == 200){
            dispatch(onLogin(data))
            localStorage.setItem('token', data.access_token)
            localStorage.setItem('expires-in', data.expires_in)
            localStorage.setItem('r-token', data.refresh_token)
        }
        else
            dispatch(onLogOut("Las credenciales no son correctas"))
        
    }

    const checkAuth = async () => {
        return
        const token = localStorage.getItem('token')
        const refresh_token = localStorage.getItem('r-token')
        const expires_in = localStorage.getItem('expires-in')

        if( !token && !refresh_token && !expires_in ) return dispatch(onLogOut(null))

        try{
            const { data, status } = await baseApi.post('/oauth/token', {
                grant_type: 'refresh_token',
                client_id: VITE_CLIENT_ID_API,
                client_secret: VITE_CLIENT_SECRET_API,
                refresh_token: refresh_token
            })

            if(status == 200){
                dispatch(onLogin(data))
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('expires-in', data.expires_in)
                localStorage.setItem('r-token', data.refresh_token)
            }
            else
                dispatch(onLogOut("Las credenciales no son correctas"))

        }catch(error){
            console.log(error)            
        }
            
        
        
    }

    const logoutFetch = () => {
        localStorage.clear()
        dispatch(onLogOut(null))
    }

    return {
        //Properties
        status,

        //Methods
        loginFetch,
        checkAuth,
        logoutFetch
    }
}