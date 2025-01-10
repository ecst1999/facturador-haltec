import { Button, Input } from "keep-react"
import React, { useState } from "react"
import { UseAuthStore, UseForm } from "../hooks";


export const Login = () => {

  const { usuario, clave, onInputChange } = UseForm({
    usuario: "",
    clave: ""
  });

  const { loginFetch } = UseAuthStore();

  const onLoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    
    event.preventDefault()

    if(usuario == "" || clave == ""){
        console.log("Llenar Campos")        
    }

    loginFetch(usuario, clave);
    
  }


  return <div className="grid justify-items-center p-3">

    <p className="text-body-2">Iniciar sesión</p>

    <form onSubmit={onLoginSubmit} className="w-1/2 p-3 grid" autoComplete="off">



      <Input placeholder="Usuario" type="text" name="usuario" value={usuario} onChange={onInputChange} />
      <Input placeholder="Contraseña" type="password" className="mt-3" name="clave" value={clave} onChange={onInputChange}/>

      <Button variant="outline" className="mt-3 justify-items-center" radius="full" size="lg">
        Iniciar sesión
      </Button>
    </form>

  </div>;
};
