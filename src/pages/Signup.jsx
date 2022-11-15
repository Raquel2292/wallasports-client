import { useState } from "react";
import { signupService } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../context/auth.context";

function Signup() {
  const navigate = useNavigate();

  const { authenticaUser } = useContext(AuthContext)

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userImage, setuserImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleLastnameChange = (e) => setLastname(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleUserImageChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setuserImage(reader.result)
    };
    reader.onerror = function (error) {
      console.log('Error al crear la imagen: ', error);
    };
  }

  

  const handleSignup = async (e) => {
    e.preventDefault();

    const newUser = {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      userImage: userImage,
    };

    try {
      await signupService(newUser).then((response) => { 
        localStorage.setItem("authToken", response.data.authToken)
        authenticaUser()
        navigate("/profile")
      });
    } catch (error) {
      /* console.log(error.response.status)
      console.log(error.response.data.errorMessage) */
      if (error.response && error.response.status === 400) {
        //me quedo en donde estoy (componente) y muestro el mensaje de error
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
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
        <label form="userImage">Imagen de Perfil</label>
        <input type="file"  onChange={handleUserImageChange} />
        
        <br />
        <button type="submit">Signup</button>

        {errorMessage !== "" ? <p>{errorMessage}</p> : null}
      </form>

     
    </div>
  );
}

export default Signup;
