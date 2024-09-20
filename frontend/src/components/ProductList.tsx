import { useState } from 'react';
import { Link } from 'react-router-dom'; // Assicurati di importare Link
import { Product } from '../models/product';
import Pagination from './Pagination';
import ProductSearchAndFilter from './ProductSearchAndFilter';
import StarRating from './StarRating';

const ProductList = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="container mx-auto px-4 mb-16 mt-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Lista Prodotti Disponibili</h1>

      <ProductSearchAndFilter setFilteredProducts={setFilteredProducts} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {currentProducts.length === 0 ? (
          <div>Nessun prodotto trovato</div>
        ) : (
          currentProducts.map((product: Product) => (
            <Link
              to={`/products/${product.id}`} // Collegamento alla pagina dettaglio prodotto
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
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default ProductList;