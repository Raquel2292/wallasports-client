import React from "react";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

function Product(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={props.product.productImage} />
      <Card.Body>
        <Card.Title>
          {props.product.name}
          <Card.Text>
            {props.product.price}€
            {props.product.reserved && (
              <Badge className="m-1" pill bg="info">
                Reservado
              </Badge>
            )}
          </Card.Text>
        </Card.Title>

        {props.detail === true ? (
          <Card.Text>{props.product.description}</Card.Text>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default Product;
