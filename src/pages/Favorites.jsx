import { React , useEffect, useState, useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getFavorites } from "../services/product.services";
import Product from "../components/Product";
import CardGroup from "react-bootstrap/CardGroup";


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
      const response = await getFavorites(); 
      //guardo la información en el estado
      console.log("Listado de favoritos", response);
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
      <h1 className="pageTitle" >¿Qué tenemos por aquí?</h1>

      <CardGroup>
      {list.map((eachProduct) => {
        return (
          <Link className="m-4" to={`/products/detail/${eachProduct._id}`} key={eachProduct._id}>
            <Product detail={false} product={eachProduct} />
          </Link>
        );
      })}
      </CardGroup>
    </div>
  );
}

export default Favorites;
