import { Navbar, NavbarItem, NavbarContainer, NavbarBrand, NavbarList, NavbarCollapseBtn, NavbarCollapse, Button } from "keep-react"
import { UseAuthStore } from "../hooks"

export const NavBarLayout = () => {

  const { logoutFetch } = UseAuthStore();

  const onCerrarSesion = () => {
    logoutFetch()
  }

  return (
    <Navbar className="p-4">
      <NavbarContainer>
        <NavbarBrand>
          <img src="/vite.svg" alt="keep" />
        </NavbarBrand>
        <NavbarList>                        
          <NavbarItem> Crear y validar Factura</NavbarItem>           
          <NavbarItem>Obtener Facturas</NavbarItem>          
          <Button variant="outline" color="error" onClick={onCerrarSesion}>Cerrar sesión</Button>
        </NavbarList>
        <NavbarCollapseBtn />
        <NavbarCollapse> 
          <NavbarItem>Crear y validar Factura</NavbarItem>
          <NavbarItem>Obtener Facturas</NavbarItem>          
          <Button variant="outline" color="error" onClick={onCerrarSesion}>Cerrar sesión</Button>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>

  )
}
