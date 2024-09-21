import { useState } from 'react';
import { useGetCategoriesQuery } from '../store/apiSlice'; // Importa la query per ottenere le categorie

interface Filters {
  searchTerm: string;
  category: string;
  sortOption: string;
}

interface ProductSearchAndFilterProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

const ProductSearchAndFilter = ({ filters, onFilterChange }: ProductSearchAndFilterProps) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const { data: categories, isLoading, error } = useGetCategoriesQuery();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalFilters({ ...localFilters, searchTerm: e.target.value });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalFilters({ ...localFilters, category: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalFilters({ ...localFilters, sortOption: e.target.value });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  return (
    <div className="mb-6 p-6 shadow-lg rounded-lg border border-gray-200"> 
   
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cerca per nome o descrizione"
          value={localFilters.searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
        />
      </div>

      <div className="mb-4">
        {isLoading ? (
          <p className="text-gray-500">Caricamento categorie...</p>
        ) : error ? (
          <p className="text-red-500">Errore nel caricamento delle categorie</p>
        ) : (
          <select
            value={localFilters.category}
            onChange={handleCategoryChange}
            className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
          >
            <option value="">Tutte le categorie</option>
            {categories?.map((category: string) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="mb-4">
        <select
          value={localFilters.sortOption}
          onChange={handleSortChange}
          className="border border-gray-300 p-3 rounded-lg w-full bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-600 transition duration-300"
        >
          <option value="">Ordina per</option>
          <option value="price">Prezzo: dal più basso al più alto</option>
          <option value="-price">Prezzo: dal più alto al più basso</option>
          <option value="-rating">Valutazione</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition duration-300"
      >
        Applica Filtri
      </button>
    </div>
  );
};

export default ProductSearchAndFilter;