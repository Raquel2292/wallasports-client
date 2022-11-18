import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

function Home() {
  return (
    <div className="contenedor">
      <div className="home-image">
        <div className="home-text">
          <h1>¡Bienvenido a Wallasports!</h1>
          <h3>¿Eres un apasionado del deporte?</h3>
          <h3>¡Si buscas material o ropa deportiva, estás en el sitio indicado!</h3>
          <h3>¡Elige, y navega!</h3>
          <p>¿Tienes tus propios productos y quieres publicarlos? ¡Adelante! Estás en el sitio correcto</p>
        </div>
      </div>
      <div className="title-links">
        <h2>Encuentra lo que necesitas</h2>
      </div>
      <div className="home-links">
        <Link className="card-home" to="/productsList/material">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="materialImage.jpg" />
            <Card.Body>
              <Card.Title>Material Deportivo</Card.Title>
            </Card.Body>
          </Card>
        </Link>

        <Link className="card-home" to="/productsList/clothing">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="ropaImage.webp" />
            <Card.Body>
              <Card.Title>Ropa Deportiva</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </div>
    </div>
  );
}

export default Home;
