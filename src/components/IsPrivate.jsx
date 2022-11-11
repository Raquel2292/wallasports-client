// componente envoltorio que verifica si el usuario esta logeado o no
// y renderiza el componente interno acorde
import {useContext} from 'react'
import {AuthContext} from "../context/auth.context"
import {Navigate} from "react-router-dom"

function IsPrivate(props) {
    const {isLoggedIn} = useContext(AuthContext)
    if (isLoggedIn === true){
        // si isLoggedIn es true, renderiza props.children
        return props.children
    } else {
        //si no, redirecciona
      return <Navigate to="/login"/>
      //utilizamos navigate para renderizar algo
    }
}

export default IsPrivate