import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../store/apiSlice';
import { Product } from '../models/product';
import Loading from './Loading';
import ErrorLoading from './ErrorLoading';

interface ProductSearchAndFilterProps {
  setFilteredProducts: (data: Product[]) => void;
}

const ProductSearchAndFilter = ({ setFilteredProducts }: ProductSearchAndFilterProps) => {
  const [limit] = useState(10);
  const [skip] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortOption, setSortOption] = useState('');

  const { data, error, isLoading } = useGetProductsQuery({
    limit,
    skip,
    search: searchTerm,
    category,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
    sort: sortOption,
  });

  useEffect(() => {
    if (data) {
      setFilteredProducts(data.products);
    }
  }, [data, setFilteredProducts]);

  if (isLoading) return <Loading />;
  if (error) return <ErrorLoading />;

  return (
    <div className="container mx-auto px-4 py-8 text-black shadow-lg rounded-lg">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Cerca per nome o descrizione"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black"
        />
      </div>

      <div className="mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black"
        >
          <option value="">Tutte le categorie</option>
          {data?.products &&
            Array.from(new Set(data.products.map((p) => p.category))).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
        </select>
      </div>

      <div className="mb-6 flex space-x-4">
        <input
          type="number"
          placeholder="Prezzo Minimo"
          value={priceRange.min}
          onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
          className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black"
        />
        <input
          type="number"
          placeholder="Prezzo Massimo"
          value={priceRange.max}
          onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
          className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black"
        />
      </div>

      <div className="mb-6">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black"
        >
          <option value="">Ordina per</option>
          <option value="price">Prezzo: dal più basso al più alto</option>
          <option value="-price">Prezzo: dal più alto al più basso</option>
          <option value="-rating">Valutazione</option>
        </select>
      </div>
    </div>
  );
};

export default ProductSearchAndFilter;