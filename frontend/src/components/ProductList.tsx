import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../models/product';
import Pagination from './Pagination';
import StarRating from './StarRating';
import { useGetProductsQuery } from '../store/apiSlice';
import ProductSearchAndFilter from './ProductSearchAndFilter';

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

  const { data} = useGetProductsQuery({
    limit: productsPerPage,
    skip,
    search: filters.searchTerm,
    category: filters.category,
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
      <h1 className="text-4xl font-bold mb-8 text-center">Lista Prodotti Disponibili</h1>

      <div className="container mx-auto px-4 py-8 text-black shadow-lg rounded-lg">
        <ProductSearchAndFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredProducts.length === 0 ? (
          <div>Nessun prodotto trovato</div>
        ) : (
          filteredProducts.map((product: Product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="block border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-auto sm:h-48 md:h-64 lg:h-80 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
              <StarRating rating={product.rating} />
              <p className="text-xl font-bold text-blue-600 mt-2">Prezzo: {product.price} €</p>
            </Link>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ProductList;