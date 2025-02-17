import { Navbar, NavbarContainer, NavbarBrand, NavbarList, NavbarCollapseBtn, NavbarCollapse, Button } from "keep-react"
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
          <img src="https://www.factus.com.co/_astro/favicon.DMncryqX.ico" alt="keep" width={40} />
        </NavbarBrand>
        <NavbarList>                                                   
          <Button variant="outline" color="error" onClick={onCerrarSesion}>Cerrar sesión</Button>
        </NavbarList>
        <NavbarCollapseBtn />
        <NavbarCollapse>                      
          <Button variant="outline" color="error" onClick={onCerrarSesion}>Cerrar sesión</Button>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>

  )
}
