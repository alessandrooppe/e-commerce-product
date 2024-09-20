import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../models/product';
import Loading from './commons/Loading';
import ErrorLoading from './commons/ErrorLoading';
import { useGetProductsQuery } from '../store/apiSlice';

interface RelatedProductsProps {
  category: string;
  currentProductId: number;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category, currentProductId }) => {
  const { data: products, error, isLoading } = useGetProductsQuery({ category, limit: 5, skip: 0 });

  if (isLoading) return <Loading />;
  if (error || !products) return <ErrorLoading />;

  const relatedProducts = products.products
    .filter((product: Product) => product.id !== currentProductId)
    .slice(0, 5);

  return (
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
  );
};

export default RelatedProducts;