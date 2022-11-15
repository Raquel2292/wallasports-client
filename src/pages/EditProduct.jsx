import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetailsService, updateProductService } from '../services/product.services'


function ProductEdit() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [ nameInput, setNameInput ] = useState("")
  const [ descriptionInput, setDescriptionInput ] = useState("")
  const [ reservedInput, setReservedInput ] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await getProductDetailsService(id)
      console.log(response)
  
      // que debo hacer para actualizar los campos con response?
      setNameInput(response.data.name)
      setDescriptionInput(response.data.description)
      setReservedInput(response.data.isReserved)
    } catch (error) {
      navigate("/error")
    }
  }

  const nameChange = (event) => setNameInput(event.target.value)
  const descriptionChange = (event) => setDescriptionInput(event.target.value)
  const reservedChange = (event) => setReservedInput(event.target.checked)

  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      
      // recopilamos los valor a actualizar
      const updatedProduct = {
        name: nameInput,
        description: descriptionInput,
        reserved: reservedInput
      }
      // llamamos al servicio de update pasando el Id y la data a actualizar
      await updateProductService(id, updatedProduct)

      // redireccionar
      navigate(`/detail/${id}`)

    } catch (error) {
      navigate("/error")
    }
  }

  return (
    <div>
      
      <h3>Formulario Editar</h3>

      <form>

        <label htmlFor="name">Nombre:</label>
        <input type="text" name="name" value={nameInput} onChange={nameChange}/>
        <br />
        <label htmlFor="description">Descripción</label>
        <input type="text" name="description" value={descriptionInput} onChange={descriptionChange}/>
        <br />
        <label htmlFor="isReserved">¿Esta Reservado?</label>
        <input type="checkbox" name="isReserved" checked={reservedInput} onChange={reservedChange}/>
        <br />
        <button onClick={handleUpdate}>Editar Producto</button>
      </form>

    </div>
  )
}

export default ProductEdit