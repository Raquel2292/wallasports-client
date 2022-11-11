import { useState } from "react";
import { loginService } from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../context/auth.context";



function Login() {

  const { authenticaUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async (e) => {
    e.preventDefault()
    //1.Recopilar las credenciales del usuario
    const userCredentials = {
        email: email,
        password: password
    }

    try {
        //2. contactar con el BACKEND para validarlo
        const response = await loginService(userCredentials)
        //console.log(response)
        //3. recibir el Token
        //console.log(response.data.authToken)
        //4. hacer algo con el Token
        //metodo de localStorage pero guardar info => localStorage.setItem
        localStorage.setItem("authToken", response.data.authToken)
        //arg1. NOMBRE de lo que vamos a guardar
        //arg2. el VALOR de lo que vamos a guardar

        //guardamos la info de que el usuario se ha logado
        authenticaUser() //invocamos la función de context que valida el Token
        //redireccionar al usuario
        navigate("/profile")
    } catch(error){
        if (error.response && error.response.status === 400){
            //me quedo en donde estoy (componente) y muestro el mensaje de error
            setErrorMessage(error.response.data.errorMessage)
          }else {
            navigate("/error")
          }
    }
  }
  return (
    <div>
      <h1>Log In</h1>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>

        {errorMessage !== "" && <p>{errorMessage}</p>}

      </form>
    </div>
  );
}

export default Login;
