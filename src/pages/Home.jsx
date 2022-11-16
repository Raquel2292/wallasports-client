import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='h1-home'>
      <h1>Estas en home</h1>

      <Link className='card-home' to="/productsList/material">Material</Link>
      <Link className='card-home' to="/productsList/clothing">Clothing</Link>


    </div>
  )
}

export default Home