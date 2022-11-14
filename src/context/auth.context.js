import { createContext,  useEffect,  useState } from "react"
import { verifyService } from "../services/auth.services"
import {SpinnerInfinity} from "spinners-react"

const AuthContext = createContext()

function AuthWrapper(props){

    const [isLoggedIn, setIsLoggedIn] = useState(false) 
    const [ user, setUser] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    useEffect(() => {
        authenticaUser()
    }, [])

    const authenticaUser =  async () => {
        setIsFetching(true)
        //ejecutar para validar el token del usuario y actualizar los estados
        try{
            const response = await verifyService() 
            console.log(response)
            // a partir de aqui el Token está validado en Fronted
            setIsLoggedIn(true) 
            setUser(response.data)
            setIsFetching(false)

        } catch(error){
            console.log(error)
            setIsLoggedIn(false) 
            setUser(null)
            setIsFetching(false)
        }
    }

    const passedContext = {
        //. todos los estados y funciones globales
        isLoggedIn,
        user,
        authenticaUser
    }

    if (isFetching === true){
        return  (
            <div className="App">
            <SpinnerInfinity size={50} thickness={100} speed={100} color="#36ad47" secondaryColor="rgba(0, 0, 0, 0.44)" />
            </div>
        )   
    }

    return (
        <AuthContext.Provider value={passedContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthWrapper
}