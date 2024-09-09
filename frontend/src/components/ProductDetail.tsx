import { useGetProductByIdQuery } from '../store/apiSlice';
import { useParams } from 'react-router-dom';
import React from 'react'

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(Number(id));

  if (isLoading) return <div>Caricamento...</div>;
  if (error) return <div>Errore nel caricamento del prodotto</div>;

  return (
    <div>
      <img src={product?.images[0]} alt={product?.title} />
      <h1>{product?.title}</h1>
      <p>{product?.description}</p>
      <p>Prezzo: {product?.price} €</p>
      <p>Categoria: {product?.category}</p>
    </div>
  );
};

export default ProductDetail;