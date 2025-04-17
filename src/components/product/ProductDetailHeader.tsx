
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface ProductDetailHeaderProps {
  category: string | undefined;
}

const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({ category }) => {
  return (
    <div className="mb-6">
      <Link to={`/${category}`} className="inline-flex items-center text-gray-600 hover:text-pink-dark transition-colors">
        <ChevronLeft size={18} />
        <span>Back to {category === 'brownies' ? 'Brownies' : 'Cakes'}</span>
      </Link>
    </div>
  );
};

export default ProductDetailHeader;
