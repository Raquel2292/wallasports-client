import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";


function NavbarHome() {
  const { authenticaUser, isLoggedIn, user } = useContext(AuthContext)
  //me borra el token de localStorage
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    //despues de borrar el token vuelvo a invocar la función de validar
    authenticaUser();
  };




  return (
      <Navbar bg="white" expand="lg">
        <Container>
          <Navbar.Brand href="/">WallaSports</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/">Inicio</Nav.Link>
              {isLoggedIn === true ? (
                <NavDropdown title={user.user.name} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">Mi perfil</NavDropdown.Item>
                  <NavDropdown.Item href="/upload">
                   Subir Productos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/favorites">
                    Mis Favoritos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/my-products">
                    Mis Productos
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/messages">
                    Mis Mensajes
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav>
                  <Nav.Link href="/signup">Registrar</Nav.Link>
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavbarHome;
