import {React, useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { editProfile, verifyService } from "../services/auth.services";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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
  
        <Form className="app-form">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label htmlFor="name">Nombre:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={nameInput}
            onChange={nameChange}
          />
          
          <Form.Label htmlFor="email">Email:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={emailInput}
            onChange={emailChange}
          />
          <Button variant="outline-primary" onClick={handleUpdate}>Editar Perfil</Button>
          </Form.Group>
        </Form>
        
      </div>
    );
  }
  
  export default EditProfile;
  