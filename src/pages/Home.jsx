import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
      <h1>Estas en home</h1>

      <Link to="/productsList/material">Material</Link>
      <Link to="/productsList/clothing">Clothing</Link>


    </div>
  )
}

export default Home