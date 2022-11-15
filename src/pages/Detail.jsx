import {React, useState, useEffect} from 'react'
import {useParams, useNavigate} from "react-router-dom"

import { getProductDetailsService } from "../services/product.services"
import Product from '../components/Product'


function Detail() {
  const { id } = useParams()
  const navigate = useNavigate()

    // 1. crear el estado donde estaran los detalles
    const [ detail, setDetail ] = useState(null)
    const [ isFetching, setIsFetching ] = useState(true)
  
    // 2. buscar la informacion del servidor/bd con el useEffect
    useEffect(() => {
      getData()
    }, [])
  
    const getData = async () => {
      try {
        // const response = await axios.get(`http://localhost:5005/api/todos/${todoId}`) // ????
        const response = await getProductDetailsService(id)
        console.log(response)
        // 3. actualizar el estado con la data
        setDetail(response.data)
        setIsFetching(false)
      } catch (error) {
        console.log(error)
        navigate("/error")
      }
    }
  
  
    // 4. clausula de guardia de buscando
    if (isFetching === true) {
      return <h3>...buscando</h3>
    }
  

  return (
    <div>
        <h1>Estas en el detalle del producto {detail.name}</h1>
        <Product detail={true} product={detail}/>
        <button type="submit">Borrar</button>
        <button type="submit">Editar</button>

    </div>
  )
}

export default Detail