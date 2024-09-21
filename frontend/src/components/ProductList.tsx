import { useState, useEffect } from 'react';
import { Product } from '../models/product';
import Pagination from './Pagination';
import { useGetProductsQuery } from '../store/apiSlice';
import ProductSearchAndFilter from './ProductSearchAndFilter';
import ProductCard from './ProductCard';

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    sortOption: '',
  });

  const productsPerPage = 20;
  const skip = (currentPage - 1) * productsPerPage;

  const { data } = useGetProductsQuery({
    limit: productsPerPage,
    skip,
    search: filters.searchTerm,
    sort: filters.sortOption,
  });

  useEffect(() => {
    if (data) {
      setFilteredProducts(data.products);
      setTotalProducts(data.total);
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="container mx-auto px-4 mb-16 mt-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Lista Prodotti Disponibili</h1>

      <ProductSearchAndFilter filters={filters} onFilterChange={handleFilterChange} />
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center text-xl text-gray-500">Nessun prodotto trovato</div>
        ) : (
          filteredProducts.map((product: Product) => (
            <ProductCard product={product} key={product.id} />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;