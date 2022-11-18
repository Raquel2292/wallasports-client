import { React, useEffect, useState } from "react";
import { verifyService, deleteProfile } from "../services/auth.services";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Profile() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  //llamar a una ruta de backend para traer el perfil del usuario
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await verifyService();
      console.log("El usuario del perfil", response);

      setUser(response.data.user);
    } catch (error) {
      navigate("/error");
    }
  };

  const deleteUser = async () => {
    try {
      await deleteProfile(user._id);
      navigate("/login");
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <div className="profile">
        <div
          className="profile-image"
          style={{ backgroundImage: `url(${user.userImage}` }}
        ></div>
        <h4>¡Bienvenido {user.name}!</h4>
      </div>
      <Button className="button-profile" variant="outline-danger" onClick={deleteUser}>
        Eliminar Perfil
      </Button>
      <Link to={"/edit-profile"}>
        <Button className="button-profile" variant="outline-primary">Editar Perfil</Button>
      </Link>
    </div>
  );
}

export default Profile;
