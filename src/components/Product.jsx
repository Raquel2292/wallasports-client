import React from "react";

function Product(props) {
  return (
    <div className="card">
    <img src={props.product.productImage} alt={props.product.name} />
      <p>{props.product.name}</p>
      <p>{props.product.price}€</p>
      <p> {props.detail === true ? props.product.description : null}</p>  {/* para que el detalle me aparezca solo en el detalle del producto*/ }
     
    </div>
  );
}

export default Product;
