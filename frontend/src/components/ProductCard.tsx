import { Link } from 'react-router-dom';
import { Product } from '../models/product';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link
      to={`/products/${product.id}`}
      key={product.id}
      className="block border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-xl hover:scale-105 transform transition-transform duration-300"
    >
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-auto sm:h-48 md:h-64 lg:h-80 object-cover mb-4 rounded-lg transition-transform duration-300 hover:scale-110"
      />
      <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
      <StarRating rating={product.rating} />
      <p className="text-xl font-bold text-blue-600 mt-2">Prezzo: {product.price} €</p>
    </Link>
  );
};

export default ProductCard;