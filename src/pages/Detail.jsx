import { React, useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import {
  getProductDetailsService,
  deleteProductService,
  addFavorite,
  deleteFavorite,
} from "../services/product.services";
import Product from "../components/Product";

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // 1. crear el estado donde estaran los detalles
  const [detail, setDetail] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // 2. buscar la informacion del servidor/bd con el useEffect
  useEffect(() => {
    getData();
  }, []);

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

  // 4. clausula de guardia de buscando
  if (isFetching === true) {
    return <h3>...buscando</h3>;
  }

  return (
    <div>
      <h1>Estas en el detalle del producto {detail.name}</h1>
      <Product detail={true} product={detail} />

      {/* si se cumple, coloco los botones, sino no */}
      {user.user._id === detail.owner ? (
        <div>
          <button onClick={deleteProduct}>Borrar</button>
          <Link to={`/edit-products/${id}`}>
            <button>Editar</button>
          </Link>
        </div>
      ) : (
        <button onClick={handleFavorites}>
          {user.user.favorites.indexOf(id) === -1  //indexOf me busca el indice del id, dentro de favorites
            ? "Añadir a favoritos"
            : "Eliminar de favoritos"}
        </button>
      )}
    </div>
  );
}

export default Detail;
