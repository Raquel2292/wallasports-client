import { React, useEffect, useState } from "react";
import { verifyService, deleteProfile } from "../services/auth.services";
import { useNavigate, Link } from "react-router-dom";

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
      <div>
        <h4>Este es tu Perfil</h4>
        <p>Nombre: {user.name}</p>
        <img src={user.userImage} alt={user.name} width="100px"/>
      </div>
      <button onClick={deleteUser}>Eliminar Perfil</button>
      <Link to={"/edit-profile"}>
            <button>Editar Perfil</button>
          </Link>
    </div>
  );
}

export default Profile;
