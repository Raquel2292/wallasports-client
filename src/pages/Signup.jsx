import { useState } from "react"
import { signupService } from "../services/auth.services"
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate()


  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword ] = useState("")
  //const [image, setImage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleNameChange = (e) => setName(e.target.value)
  const handleLastnameChange = (e) => setLastname(e.target.value)
  const handleEmailChange = (e) => setEmail(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)
  //const handleImageChange = (e) => setImage(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault()

    const newUser = {
      name: name,
      lastname: lastname,
      email: email,
      password: password,
      //image: image
    }

    try {
      await signupService(newUser)
      navigate("/login")
    } catch(error){
      /* console.log(error.response.status)
      console.log(error.response.data.errorMessage) */
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
      <h1>Signup</h1>

      <form onSubmit={handleSignup}>
        <label>Name:</label>
        <input
          type="name"
          name="name"
          value={name}
          onChange={handleNameChange}
        />

       
        <label>Last Name:</label>
        <input
          type="lastname"
          name="lastname"
          value={lastname}
          onChange={handleLastnameChange}
        />

        
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        {/* <img 
          className="image"
          src={} */}

        <button type="submit">Signup</button>

        {errorMessage !== "" ? <p>{errorMessage}</p> : null }

     </form>
    


    </div>
  );
}

export default Signup;
