import { useGetProductByIdQuery, useGetProductsQuery } from '../store/apiSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { Product } from '../models/product';
import Loading from './Loading';
import ErrorLoading from './ErrorLoading';
import { addToCart } from '../store/cartSlice';
import { useDispatch } from 'react-redux';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(Number(id));
  const { data: products } = useGetProductsQuery({ limit: 100, skip: 0 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (isLoading) return <Loading />;
  if (error || !product) return <ErrorLoading />;

  const relatedProducts = products?.products
    .filter((p: Product) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 5);

  const handleAddToCart = () => {
    dispatch(addToCart({ product: product, quantity: 1 }));
    alert(`${product?.title} è stato aggiunto al carrello!`);
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
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Prodotti Correlati</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {relatedProducts.map((relatedProduct: Product) => (
              <div key={relatedProduct.id} className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link to={`/products/${relatedProduct.id}`} className="block text-center">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{relatedProduct.title}</h3>
                  <p className="text-blue-600 font-semibold">Prezzo: {relatedProduct.price} €</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
