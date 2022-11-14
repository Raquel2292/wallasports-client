import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { authenticaUser, isLoggedIn } = useContext(AuthContext);

  //me borra el token de localStorage
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    //despues de borrar el token vuelvo a invocar la función de validar
    authenticaUser();
  };

  const asignClassName = (navInfo) => {
    console.log(navInfo.isActive);
    if (navInfo.isActive === true) {
      return "nav-active";
    } else {
      return "nav-inactive";
    }
  };

  return (
    <div>
      {isLoggedIn === true ? (
        <div>
          <NavLink to="/">
            <button>Home</button>
          </NavLink>
          <NavLink to="/profile" className={asignClassName}>
            <button>Perfíl</button>
          </NavLink>

          <NavLink to="/productsList" className={asignClassName}>
            <button>Lista de Productos</button>
          </NavLink>

          <NavLink to="/details" className={asignClassName}>
            <button>Detalles</button>
          </NavLink>

          <NavLink to="/upload" className={asignClassName}>
            <button>Subir Producto</button>
          </NavLink>

          <NavLink to="/favorites" className={asignClassName}>
            <button>Favoritos</button>
          </NavLink>+

          <NavLink to="/list" className={asignClassName}>
            <button>Lista</button>
          </NavLink>
         
          <span className="nav-inactive">
            <button onClick={handleLogout}>Cerrar Sesión</button>
          </span>
        </div>
      ) : (
        <div>
          <NavLink to="/" className={asignClassName}>
            <button>Home</button>
          </NavLink>
          <NavLink to="/signup" className={asignClassName}>
            <button>Signup</button>
          </NavLink>
          <NavLink to="/login" className={asignClassName}>
            <button>Login</button>
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Navbar;
