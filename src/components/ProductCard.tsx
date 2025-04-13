
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  category: string; // Changed from strict literal types to allow any string
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  // Ensure category is one of the valid values for routing purposes
  const safeCategory = ['brownies', 'cakes', 'other'].includes(category) 
    ? category 
    : 'other';
    
  return (
    <div className="product-card bg-white rounded-lg overflow-hidden shadow">
      <Link to={`/product/${safeCategory}/${id}`}>
        <div className="h-60 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${safeCategory}/${id}`}>
          <h3 className="font-bold text-lg mb-1 hover:text-pink-dark transition-colors">{name}</h3>
        </Link>
        <p className="text-pink-dark font-medium mb-3">₹{price}</p>
        <Button className="w-full flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
