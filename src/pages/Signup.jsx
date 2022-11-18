import { useState } from "react";
import { signupService } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { uploadImageService } from "../services/upload.services";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Signup() {
  const navigate = useNavigate();

  const { authenticaUser } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImage, setUserImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleLastnameChange = (e) => setLastname(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      userImage: userImage,
      favorites: []
    };

    console.log("usuario que envío al back", newUser)

    try {
      await signupService(newUser).then((response) => {
        localStorage.setItem("authToken", response.data.authToken);
        authenticaUser();
        navigate("/profile");
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        //me quedo en donde estoy (componente) y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  const handleUploadImageProfile = async (event) => {
    console.log(event.target.files[0]);

    // tengo que insertar la imagen en un objeto de JS capaz de transmitir archivos FE - BE
    const formularioDeEnvio = new FormData();
    formularioDeEnvio.append("userImage", event.target.files[0]);
    // "userImage" debe ser el mismo nombre de la ejecución del middleware uploader.single("userImage")

    try {
      // contactar a cloudinary (por el BE, service) para subir la imagen y recibir el URL
      const response = await uploadImageService(formularioDeEnvio);
      // subir el url al estado para la creacion del ToDo
      console.log("userImage", response.data.userImage);
      setUserImage(response.data.userImage);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <Form className="app-form" onSubmit={handleSignup} encType="multipart/form-data">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name:</Form.Label>
        <Form.Control
          type="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        </Form.Group>

        <br />
        <Form.Group className="mb-3" controlId="formBasicLastName">
        <Form.Label>Last Name:</Form.Label>
        <Form.Control
          type="lastname"
          name="lastname"
          value={lastname}
          onChange={handleLastnameChange}
        />
        </Form.Group>

        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        </Form.Group>

        <br />
        <Form.Group className="mb-3" controlId="formBasicPassword">

        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        </Form.Group>
        <br />

        <Form.Group className="mb-3" controlId="formBasicUserImage">
        <Form.Label htmlFor="userImage">Imagen:</Form.Label>
        <Form.Control
          type="file"
          name="userImage"
          onChange={handleUploadImageProfile}
        />
         <Form.Text className="text-muted">
          No olvide subir su foto de perfil
        </Form.Text>
         </Form.Group>

        <br />

        <Button variant="outline-success" type="submit">Signup</Button>

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </Form>
    </div>
  );
}

export default Signup;
