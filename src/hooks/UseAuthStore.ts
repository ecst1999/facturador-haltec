import { useDispatch, useSelector } from "react-redux"
import { onLogin, onLogOut } from "../store"
import baseApi from "../api/base/baseApi"
import { getEnviroment } from "../helpers/getEnviroment"

const {VITE_CLIENT_ID_API, VITE_CLIENT_SECRET_API} = getEnviroment()

export const UseAuthStore = () => {

    const dispatch = useDispatch();
    const { status } = useSelector( state => state.auth)

    const loginFetch = async (username: string, password: string) => {                
        
        try{

            const { data } = await baseApi.post('/oauth/token' , {
                grant_type: 'password',
                client_id: VITE_CLIENT_ID_API,
                client_secret: VITE_CLIENT_SECRET_API,
                username,
                password
            })

            localStorage.setItem('token', data.access_token)
            localStorage.setItem('expires-in', data.expires_in)
            localStorage.setItem('r-token', data.refresh_token)
            return dispatch(onLogin(data))

        } catch(error)  {
            return logoutFetch()         
        }

        
    }

    const checkAuth = async () => {        
        const token = localStorage.getItem('token')
        const refresh_token = localStorage.getItem('r-token')
        //const expires_in = localStorage.getItem('expires-in')

        setTimeout(() => {
            if( !token ) return logoutFetch()
        }, 2000);        

        try{
            
            const { data } =  await baseApi.post('/oauth/token', {
                grant_type: 'refresh_token',
                client_id: VITE_CLIENT_ID_API,
                client_secret: VITE_CLIENT_SECRET_API,
                refresh_token: refresh_token
            })

            localStorage.setItem('token', data.access_token)
            localStorage.setItem('expires-in', data.expires_in)
            localStorage.setItem('r-token', data.refresh_token)
            return dispatch(onLogin(data))
                
        }catch(error){
            return logoutFetch()         
        }
            
        
        
    }

    const logoutFetch = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("expires-in")
        localStorage.removeItem("r-token")        
        return dispatch(onLogOut(null))        
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