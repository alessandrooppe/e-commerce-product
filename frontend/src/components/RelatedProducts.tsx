import React from 'react';
import { Product } from '../models/product';
import Loading from './commons/Loading';
import ErrorLoading from './commons/ErrorLoading';
import { useGetProductsByCategoryQuery } from '../store/apiSlice';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  category: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ category }) => {
  const { data, error, isLoading } = useGetProductsByCategoryQuery({ category, limit: 5, skip: 0 });

  if (isLoading) return <Loading />;
  if (error || !data) return <ErrorLoading />;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Prodotti Correlati</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.products.map((product: Product) => (
          <ProductCard  key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;