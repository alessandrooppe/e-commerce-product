import { useGetProductsQuery } from '../store/apiSlice';
import { Link } from 'react-router-dom';
import { Product } from '../models/product';
import React, { useState } from 'react';
import Pagination from './Pagination';
import Loading from './Loading';
import ErrorLoading from './ErrorLoading';

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const skip = (currentPage - 1) * productsPerPage;

  const { data, error, isLoading } = useGetProductsQuery(
    { limit: productsPerPage, skip },
    { refetchOnMountOrArgChange: true }
  );

  if (isLoading) return <Loading />;
  if (error) return <ErrorLoading />;
  if (!data?.products || data.products.length === 0) return <div>Non ci sono prodotti al momento disponibili</div>;

  const totalPages = Math.ceil(data.total / productsPerPage);

  return (
    <div className="container mx-auto px-4 mb-16 mt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Lista Prodotti</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((product: Product) => (
          <div key={product.id} className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Link to={`/products/${product.id}`} className="block text-center">
              {product.images.length > 0 && (
               <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-auto sm:h-48 md:h-64 lg:h-80 object-cover mb-4 rounded-lg"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>

              <div className="flex justify-center mt-2 mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 ${i < product.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    {i < product.rating ? '★' : '☆'}
                  </span>
                ))}
              </div>

              <p className="text-xl font-bold text-blue-600 mt-2">Prezzo: {product.price} €</p>
            </Link>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ProductList;