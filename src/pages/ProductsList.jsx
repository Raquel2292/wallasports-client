import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getAllProductService } from "../services/product.services";
import Product from "../components/Product";
import CardGroup from "react-bootstrap/CardGroup";

function ProductsList() {
  const [list, setList] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const { type } = useParams();

  //Llamo a la API
  useEffect(() => {
    productData();
  }, []);

  const productData = async () => {
    try {
      const response = await getAllProductService(type);
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
    <div className="products-list">
      <h1 className="pageTitle" >Estás en la lista de productos</h1>
      <CardGroup>
        {list.map((eachProduct) => {
          return (
            <Link
              className="m-4"
              to={`/products/detail/${eachProduct._id}`}
              key={eachProduct._id}
            >
              <Product detail={false} product={eachProduct} />
            </Link>
          );
        })}
      </CardGroup>
    </div>
  );
}

export default ProductsList;
