import { useState } from "react";
import { signupService } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { uploadImageService } from "../services/upload.services";

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

      <form onSubmit={handleSignup} encType="multipart/form-data">
        <label>Name:</label>
        <input
          type="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <label>Last Name:</label>
        <input
          type="lastname"
          name="lastname"
          value={lastname}
          onChange={handleLastnameChange}
        />

        <br />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <label htmlFor="userImage">Imagen</label>
        <input
          type="file"
          name="userImage"
          onChange={handleUploadImageProfile}
        />

        <br />

        <button type="submit">Signup</button>

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>
    </div>
  );
}

export default Signup;
