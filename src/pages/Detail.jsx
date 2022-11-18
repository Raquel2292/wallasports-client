import { React, useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  getProductDetailsService,
  deleteProductService,
  addFavorite,
  deleteFavorite,
} from "../services/product.services";
import { sendMessage } from "../services/messages.services";
import Product from "../components/Product";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CardGroup from "react-bootstrap/CardGroup";


function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // 1. crear el estado donde estaran los detalles
  const [detail, setDetail] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [textInput, setTextInput] = useState("");
  const [sendedMessage, setSendedMessage] = useState(false);

  // 2. buscar la informacion del servidor/bd con el useEffect
  useEffect(() => {
    getData();
  }, []);

  const textChange = (event) => setTextInput(event.target.value);

  const getData = async () => {
    try {
      // const response = await axios.get(`http://localhost:5005/api/todos/${id}`) // ????
      const response = await getProductDetailsService(id);
      console.log(response);
      // 3. actualizar el estado con la data
      setDetail(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const deleteProduct = async () => {
    try {
      await deleteProductService(id);
      navigate("/my-products");
    } catch (error) {
      navigate("/error");
    }
  };

  const handleFavorites = async () => {
    const position = user.user.favorites.indexOf(id); //me busca el indice del id, dentro de favoritos
    if (position === -1) {
      try {
        await addFavorite(id); //añadir a favorito por el id
        user.user.favorites.push(id); //actualiza la lista de favoritos con el id
      } catch (error) {
        navigate("/error");
      }
    } else {
      try {
        await deleteFavorite(id); //elimina a favorito por el id
        user.user.favorites.splice(position, 1); // me elimina el favorito de la posición en la que esté
      } catch (error) {
        navigate("/error");
      }
    }
  };

  const sendNewMessage = async (event) => {
    event.preventDefault();
    try {
      const newMessage = {
        text: textInput,
      };
      //a sendMessage le envio el id del Producto, y el nuevo mensaje creado
      await sendMessage(id, newMessage);
      //vacía el campo del textarea
      setTextInput("")
      setSendedMessage(true); //pone la variable a true cuando el mensaje se ha enviado
    } catch (error) {
      console.log(error)
      navigate("/error");
    }
  };

  // 4. clausula de guardia de buscando
  if (isFetching === true) {
    return <h3>...buscando</h3>;
  }

  return (
    <div>
      <h1>Estas en el detalle del producto {detail.name}</h1>
      <CardGroup>
      <Product detail={true} product={detail} />
      </CardGroup>
      <Form className="app-form">
      <Form.Group className="mb-3" controlId="formBasicName">

      {/* si se cumple, coloco los botones, sino no */}
      {user.user._id === detail.owner ? (
        <div>
          <Button variant="outline-danger" onClick={deleteProduct}>Borrar</Button>
          <Link to={`/edit-products/${id}`}>
            <Button variant="outline-primary">Editar</Button>
          </Link>
          
        </div>
      ) : (
        <div>
          <Button variant="outline-danger" onClick={handleFavorites}>
            {user.user.favorites.indexOf(id) === -1 //indexOf me busca el indice del id, dentro de favorites
              ? "Añadir a favoritos"
              : "Eliminar de favoritos"}
          </Button>

          <Form>
            <Form.Label htmlFor="text">Puedes dejar un mensaje al propietario</Form.Label>
            <Form.Control as="textarea"
              type="text"
              name="text"
              value={textInput}
              onChange={textChange}
            />
            <Button variant="outline-primary" onClick={sendNewMessage}>Enviar</Button>
            {/* Cuando la variable cambie a true, muestrame este mensaje */}
            {sendedMessage && <p>Mensaje enviado</p>}
          </Form>
        </div>
      )}
      </Form.Group>
      </Form>
    </div>
    
  );
}

export default Detail;
