import { React , useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getFavorites } from "../services/product.services";
import Product from "../components/Product";

function Favorites() {
  const { user } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  //Llamo a la API
  useEffect(() => {
    getList();
  }, []);

  const getList = async () => {
    try {
      const response = await getFavorites(user.user.favorites); //le paso un array de favoritos, pero no me lo reconoce
      //guardo la información en el estado
      console.log("Listado de productos", response);
      setList(response.data);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  //cluasula de guardia
  if (isFetching === true) {
    return <h4>....searching</h4>;
  }
  return (
    <div>
      <h1>Estás en la lista de productos</h1>

      {list.map((eachProduct) => {
        return (
          <Link to={`/products/detail/${eachProduct._id}`}>
            <Product detail={false} product={eachProduct} />
          </Link>
        );
      })}
    </div>
  );
}

export default Favorites;
