import { Navbar, NavbarItem, NavbarContainer, NavbarBrand, NavbarList, NavbarCollapseBtn, NavbarCollapse, Button } from "keep-react"

export const NavBarLayout = () => {

  const onCerrarSesion = () => {
    console.log("cerrando sesión....")
  }

  return (
    <Navbar className="p-4">
      <NavbarContainer>
        <NavbarBrand>
          <img src="/vite.svg" alt="keep" />
        </NavbarBrand>
        <NavbarList>                    
          <NavbarItem>Figma</NavbarItem>
          <NavbarItem>Documentation</NavbarItem>
          <NavbarItem>Blog</NavbarItem>
          <Button variant="outline" color="error" onClick={onCerrarSesion}>Cerrar sesión</Button>
        </NavbarList>
        <NavbarCollapseBtn />
        <NavbarCollapse>
          <NavbarItem>Figma</NavbarItem>
          <NavbarItem>Documentation</NavbarItem>
          <NavbarItem>Blog</NavbarItem>
          <Button variant="outline" color="error" onClick={onCerrarSesion}>Cerrar sesión</Button>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>

  )
}
