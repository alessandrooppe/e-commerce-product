import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetProductByIdQuery } from '../store/apiSlice';
import Loading from './commons/Loading';
import ErrorLoading from './commons/ErrorLoading';
import { addToCart } from '../store/cartSlice';
import RelatedProducts from './RelatedProducts';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(Number(id));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  if (isLoading) return <Loading />;
  if (error || !product) return <ErrorLoading />;

  const handleAddToCart = () => {
    dispatch(addToCart({ product: product, quantity: 1 }));
    setFeedbackMessage(`${product?.title} è stato aggiunto al carrello!`);

    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
      >
        Torna Indietro
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <img
            src={product?.images[0]}
            alt={product?.title}
            className="w-full h-auto max-w-md object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
          <p className="text-lg mb-6 text-gray-700">{product?.description}</p>
          <p className="text-2xl font-semibold text-blue-600 mb-4">Prezzo: {product?.price} €</p>
          <p className="text-lg font-medium text-gray-500 mb-6">Categoria: {product?.category}</p>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Aggiungi al Carrello
          </button>

          {feedbackMessage && (
            <div className="mt-4 bg-green-200 text-green-800 px-4 py-2 rounded-lg">
              {feedbackMessage}
            </div>
          )}
        </div>
      </div>

      {product && <RelatedProducts category={product.category} currentProductId={product.id} />}
    </div>
  );
};

export default ProductDetail;