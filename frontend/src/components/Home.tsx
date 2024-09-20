import { Link } from 'react-router-dom';
import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Benvenuto nel nostro E-commerce</h1>
      <Link
        to="/products"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300 mb-4"
      >
        Vai alla Lista dei Prodotti
      </Link>
      <a
        href="https://github.com/alessandrooppe/e-commerce-product/tree/main"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Visita il repository GitHub
      </a>
    </div>
  );
};

export default Home;