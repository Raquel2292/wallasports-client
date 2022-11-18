import { React, useState, useContext } from "react";
import { uploadProduct } from "../services/product.services";
import { useNavigate } from "react-router-dom";
import { uploadProductImage } from "../services/upload.services";
import { AuthContext } from "../context/auth.context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

function Upload() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [productImage, setProductImage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleTypeChange = (e) => setType(e.target.value);

  //recibo un evento porque voy a meter la función en el formulario

  const handleNewProduct = async (event) => {
    event.preventDefault();

    //Si algún campo no está relleno, no sigue la función, le lanza error con mensaje. Del contrario puede subir el producto
    if (
      !name ||
      !description ||
      !price ||
      !type ||
      !productImage ||
      !user.user._id
    ) {
      setErrorMessage("Todos los campos son obligatorios");
    } else {
      const newProduct = {
        name,
        description,
        price,
        type,
        productImage,
        reserved: false,
        owner: user.user._id,
      };
      try {
        console.log("producto que envío al back", newProduct);
        const response = await uploadProduct(newProduct);
        console.log("Producto creado", response);
        navigate(`/products/detail/${response.data._id}`);
      } catch (error) {
        console.log(error.response.data.errorMessage);
        if (error.response && error.response.status === 400) {
          // si el error es de tipo 400 me quedo en el componente y muestro el mensaje de error
          setErrorMessage(error.response.data.errorMessage);
        } else {
          // si el error es otro (500) entonces si redirecciono a /error
          navigate("/error");
        }
      }
    }
  };

  const handleUploadImagePrduct = async (event) => {
    console.log(event.target.files[0]);

    // tengo que insertar la imagen en un objeto de JS capaz de transmitir archivos FE - BE
    const formularioDeEnvio = new FormData();
    formularioDeEnvio.append("productImage", event.target.files[0]);
    // "productImage" debe ser el mismo nombre de la ejecución del middleware uploader.single("productImage")

    try {
      // contactar a cloudinary (por el BE, service) para subir la imagen y recibir el URL
      const response = await uploadProductImage(formularioDeEnvio);
      // subir el url al estado para la creacion del ToDo
      console.log("la imagen del producto", response.data.productImage);
      setProductImage(response.data.productImage);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <div>
      <h1 className="pageTitle" >¿Qué vas a ofrecernos hoy?</h1>

      <Form className="app-form" onSubmit={handleNewProduct}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label htmlFor="description">Description:</Form.Label>
          <Form.Control as="textarea"
            type="text"
            name="description"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label htmlFor="price">Price:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={price}
            onChange={handlePriceChange}
          />
        </Form.Group>

        <Dropdown>
          <Form.Group className="mb-3" controlId="formBasicTypeProduct">
            <Form.Label htmlFor="typeProduct">Tipo de Producto</Form.Label>
            <Form.Select value={type} onChange={handleTypeChange}>
              <option value="">Elige el tipo del producto</option>
              <option value="clothing">Clothing</option>
              <option value="material">Material</option>
            </Form.Select>
          </Form.Group>
        </Dropdown>

        <Form.Group className="mb-3" controlId="formBasicImage">
          <Form.Label htmlFor="productImage">Imagen</Form.Label>
          <Form.Control
            type="file"
            name="productImage"
            onChange={handleUploadImagePrduct}
          />
        </Form.Group>

        {errorMessage}

        <Button variant="outline-primary" type="submit">
          Subir Producto
        </Button>
      </Form>
    </div>
  );
}

export default Upload;
