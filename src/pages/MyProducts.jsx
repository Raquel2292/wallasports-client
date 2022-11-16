import {React, useContext, useEffect, useState} from 'react';
import { AuthContext } from "../context/auth.context";
import { getAllUserProducts } from "../services/product.services";
import { Link } from "react-router-dom";
import Product from "../components/Product";



function MyProducts() {
    //aquí tengo toda la información del user
    const {user} = useContext(AuthContext);
    const [ list, setList ] = useState([]);
    const [ isFetching, setIsFetching ] = useState(true);

    useEffect(() => {
        getUserProducts();
      }, []);

    
      const getUserProducts = async () => {
        try {
          const response = await getAllUserProducts(user.user._id);
          //guardo la información en el estado
          console.log("Productos de mi usuario", response);
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


export default MyProducts