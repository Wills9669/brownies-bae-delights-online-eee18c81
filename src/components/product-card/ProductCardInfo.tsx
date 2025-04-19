
import { Link } from 'react-router-dom';

interface ProductCardInfoProps {
  id: string;
  name: string;
  price: string;
  category: string;
  description?: string;
}

const ProductCardInfo = ({ id, name, price, category, description }: ProductCardInfoProps) => {
  return (
    <div className="p-4">
      <Link to={`/product/${category}/${id}`}>
        <h3 className="font-bold text-lg mb-1 hover:text-pink-dark transition-colors">{name}</h3>
      </Link>
      {description && <p className="text-gray-600 text-sm mb-2">{description}</p>}
      <p className="text-pink-dark font-medium mb-3">₹{price}</p>
    </div>
  );
};

export default ProductCardInfo;
