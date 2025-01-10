import { useEffect } from "react";
import { UseAuthStore } from "../hooks";
import {  Navigate, Route, Routes } from "react-router";
import { LoadingLayout, NavBarLayout } from "../layouts";
import { FacturaForm, Home, Login } from "../pages";


export const RouterIndex = () => {

    const { status, checkAuth } = UseAuthStore()

    useEffect(() => {
        checkAuth()        
    }, [status]);
    

  return (
    <>

        {
            (status === 'loading') && <LoadingLayout />
        }
        
        {
            (status === 'authenticated')            
            && <NavBarLayout />                                    
        }

        <Routes>
            {
                (status === 'not-authenticated')
                ? (                  
                    <>
                        {/* Rutas públicas */}
                        <Route path="/auth/*" element={ <Login /> }/>
                        <Route path="/*" element={ <Navigate to="/auth/login"/> } />
                    </>
                )
                : (                                        
                    <>
                        {/* Rutas privadas */}
                        <Route path="/home" element={ <Home /> }/>
                        <Route path="/factura-form" element={ <FacturaForm /> }/>
                        <Route path="/*" element={ <Navigate to="/home"/> } />
                    </>
                )
            }
        </Routes>
    </>
    )
  
};
