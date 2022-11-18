import {React, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductDetailsService,
  updateProductService,
} from "../services/product.services";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [reservedInput, setReservedInput] = useState(false);
  const [priceInput, setPriceInput] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getProductDetailsService(id);
      console.log(response);

      // que debo hacer para actualizar los campos con response?
      setNameInput(response.data.name);
      setDescriptionInput(response.data.description);
      setReservedInput(response.data.reserved);
      setPriceInput(response.data.price);
    } catch (error) {
      navigate("/error");
    }
  };

  const nameChange = (event) => setNameInput(event.target.value);
  const descriptionChange = (event) => setDescriptionInput(event.target.value);
  const reservedChange = (event) => setReservedInput(event.target.checked);
  const priceChange = (event) => setPriceInput(event.target.value);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      // recopilamos los valor a actualizar
      const updatedProduct = {
        name: nameInput,
        description: descriptionInput,
        reserved: reservedInput,
        price: priceInput,
      };
      // llamamos al servicio de update pasando el Id y la data a actualizar
      await updateProductService(id, updatedProduct);

      // redireccionar
      navigate(`/products/detail/${id}`);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <div>
      <h3>Formulario Editar</h3>

      <Form className="app-form">
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label htmlFor="name">Nombre:</Form.Label>
        <Form.Control 
          type="text"
          name="name"
          value={nameInput}
          onChange={nameChange}
        />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">

        <Form.Label htmlFor="description">Descripción</Form.Label>
        <Form.Control as="textarea"
          type="text"
          name="description"
          value={descriptionInput}
          onChange={descriptionChange}
        />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label htmlFor="isReserved">¿Esta Reservado?</Form.Label>
        <InputGroup.Checkbox aria-label="Checkbox for following text input"
          name="isReserved"
          checked={reservedInput}
          onChange={reservedChange}
        />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label htmlFor="price">Price:</Form.Label>
        <Form.Control
          type="number"
          name="price"
          value={priceInput}
          onChange={priceChange}
        />
        </Form.Group>
        <Button variant="outline-primary" onClick={handleUpdate}>Editar Producto</Button>
      </Form>
    </div>
  );
}

export default EditProduct;
