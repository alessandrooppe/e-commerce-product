import { useGetProductsQuery } from '../store/apiSlice';
import { Link } from 'react-router-dom';
import React from 'react'
import { Product } from '../models/product';

const ProductList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>Errore nel caricamento dei prodotti</div>;
  if (products?.length === 0) return <div>Non ci sono prodotti al momento disponibili</div>;

  return (
    <div>
      <h1>Lista Prodotti</h1>
      <div className="grid grid-cols-4 gap-4">
        {products && products?.map((product: Product) => (
          <div key={product.id} className="border p-4">
            <Link to={`/products/${product.id}`}>
              {/* <img src={product.image} alt={product.title} className="w-full h-48 object-cover" /> */}
              <h3>{product.title}</h3>
              <p>Prezzo: {product.price} €</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;