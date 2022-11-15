import { React, useState } from "react";
import {uploadProduct} from '../services/product.services'
import { useNavigate } from "react-router-dom";


function Upload() {
  const navigate = useNavigate()
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [imageProduct, setImageProduct] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);
  

  const handleImageProductChange = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setImageProduct(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error al crear la imagen: ", error);
    };
  };

  //recibo un evento porque voy a meter la función en el formulario
  
  const handleNewProduct = async (event) => {
    event.preventDefault()

    //Si algún campo no está relleno, no sigue la función, le lanza error con mensaje. Del contrario puede subir el producto
    if (!name || !description || !price || !type || !imageProduct) {
      setErrorMessage("Todos los campos son obligatorios");
    }
    else {
      const newProduct = {
        name, 
        description,
        price,
        type,
        imageProduct
      }
      try{
        console.log(newProduct)
        const response = await uploadProduct(newProduct)
        console.log("Producto creado", response);
        navigate(`/products/detail/${response.data._id}`)
      }catch (error){
        console.log(error.response.status)
        console.log(error.response.data.errorMessage)
        if (error.response && error.response.status === 400) {
          // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
          setErrorMessage(error.response.data.errorMessage);
        } else {
          // si el error es otro (500) entonces si redirecciono a /error
          navigate("/error");
        }
      }
    }
  }


  return (
    <div>
      <h1>Sube tus productos aquí</h1>

      <form onSubmit={handleNewProduct}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        <br />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={handlePriceChange}
        />

        
        <br />
        <label htmlFor="typeProduct">Tipo de Producto</label>
        <select value={type} onChange={handleTypeChange}>
          <option value="">Elige el tipo del producto</option>
          <option value="clothing">Clothing</option>
          <option value="material">Material</option>
        </select>
        <br/>
        

        <br />
        <label htmlFor="imageProduct">Imagen del Producto</label>
        <input
          type="file"
          name="imageProduct"
          onChange={handleImageProductChange}
        />
        <br/>
        

        <br />

        {errorMessage}

        <button type="submit">Subir Producto</button>
      </form>
    </div>
  );
}

export default Upload;
