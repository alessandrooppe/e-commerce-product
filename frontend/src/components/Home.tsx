import { Link } from 'react-router-dom';
import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>Benvenuto nel nostro E-commerce</h1>
      <Link to="/products">Vai alla Lista dei Prodotti</Link>
    </div>
  );
};

export default Home;