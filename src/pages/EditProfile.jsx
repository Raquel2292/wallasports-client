import {React, useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { editProfile, verifyService } from "../services/auth.services";
import { AuthContext } from "../context/auth.context";

function EditProfile() {
    const navigate = useNavigate();
    const {user} = useContext(AuthContext);
  
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
  
    useEffect(() => {
      getUser();
    }, []);
  
    const getUser = async () => {
      try {
        const response = await verifyService();
        console.log("El usuario a editar", response);
  
        // que debo hacer para actualizar los campos con response?
        setNameInput(response.data.user.name);
        setEmailInput(response.data.user.email);
      } catch (error) {
        navigate("/error");
      }
    };
  
    const nameChange = (event) => setNameInput(event.target.value);
    const emailChange = (event) => setEmailInput(event.target.value);

    const handleUpdate = async (event) => {
      event.preventDefault();
      try {
        // recopilamos los valor a actualizar
        const userToEdit = {
            
          name: nameInput,
          email: emailInput,
        };
        // llamamos al servicio de update pasando el Id y la data a actualizar
        await editProfile(user.user._id, userToEdit);
  
        // redireccionar
        navigate(`/profile`);
      } catch (error) {
        navigate("/error");
      }
    };
  
    return (
      <div>
        <h3>Formulario Editar Perfil</h3>
  
        <form>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            value={nameInput}
            onChange={nameChange}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={emailInput}
            onChange={emailChange}
          />
          <button onClick={handleUpdate}>Editar Perfil</button>
        </form>
      </div>
    );
  }
  
  export default EditProfile;
  