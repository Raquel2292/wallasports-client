import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"

import { getAllProductService } from "../services/auth.services"

function ProductsList() {

  const [ list, setList ] = useState([])
  const [isFetching, setIsFetching ] = useState(true)

  //Llamo a la API
  useEffect(() => {
    productData()
  }, [])

  const productData = async () => {
    try {
      const response = await getAllProductService()
      //guardo la información en el estado
      console.log(response)
      setList(response.data)
      setIsFetching(false)
    }catch(error){
      console.log(error)
    }
  }

  //cluasula de guardia
  if (isFetching === true){
    return <h4>....searching</h4>
  }
  return (
    <div>

    <div actualizarLista={productData}/>

        <h1>Estas en la lista de productos</h1>

        {list.map((eachProduct) => {
          return (
            <p key={eachProduct._id}>
              <Link to={'/products/${eachProduct._id'}>{eachProduct.name}</Link>
            </p>
          )
        })}
    </div>
  )
}

export default ProductsList